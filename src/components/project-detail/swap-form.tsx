import NiceModal from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { get } from "es-toolkit/compat";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Address } from "viem";
import { useAccount, useBalance } from "wagmi";

import { IconGradientBox, IconSwap, IconUpAndDown } from "@/components/icons";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { ModalError } from "@/components/shared/modal-error";
import { ModalProcessing } from "@/components/shared/modal-processing";
import { ModalSuccess } from "@/components/shared/modal-success";
import { NumericInput } from "@/components/shared/numeric-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBuyToken } from "@/hooks/use-token-buy";
import { useTokenQuote } from "@/hooks/use-token-quote";
import { useSellToken } from "@/hooks/use-token-sell";
import { useDebounceState } from "@/hooks/useDebounce";
import { useGetPairReserves } from "@/hooks/useGetPairReserves";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import {
  BURN_TOKEN_SOFT_CAP,
  DEFAULT_CHAIN,
  SONIC_IMAGE,
  WRAPPED_SONIC_ADDRESS,
} from "@/lib/constants";
import { createRules, rules } from "@/lib/form";
import { fromDecimals, toCurrency } from "@/lib/number";
import { cn, isObjectEmpty, loopAsync } from "@/lib/utils";
import type { MemeResponse } from "@/services/models";
import { getMemeControllerFindDetailQueryKey } from "@/services/queries";

interface SwapFormSchema {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  slippage: number;
}

interface TokenInfoParams {
  tokenAddress: string;
  project: MemeResponse;
  balances: { tokenBalance: bigint; ethBalance: bigint };
  pairReserves: { tokenReserve: bigint; ethReserve: bigint };
  chainId: number | undefined;
}

const getTokenInformation = ({
  tokenAddress,
  project,
  balances,
  pairReserves,
  chainId,
}: TokenInfoParams) => {
  const isNative = Object.values(WRAPPED_SONIC_ADDRESS).includes(
    tokenAddress as Address
  );

  if (isNative)
    return {
      name: "SONIC",
      symbol: "S",
      decimals: 18,
      address: WRAPPED_SONIC_ADDRESS[chainId || DEFAULT_CHAIN],
      logo: SONIC_IMAGE,
      reserve: pairReserves.ethReserve,
      balance: fromDecimals(balances.ethBalance.toString(), 18),
    };

  return {
    name: project.name,
    symbol: project.symbol,
    decimals: 18,
    address: project.tokenAddress,
    logo: project.image,
    reserve: pairReserves.tokenReserve,
    balance: fromDecimals(balances.tokenBalance.toString(), 18),
  };
};

export const SwapForm = ({ project }: { project: MemeResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();

  const form = useForm<SwapFormSchema>({
    defaultValues: {
      fromToken: WRAPPED_SONIC_ADDRESS[chainId || DEFAULT_CHAIN],
      toToken: project.tokenAddress,
      fromAmount: "",
      toAmount: "",
      slippage: 5,
    },
    mode: "all",
  });

  const fromToken = form.watch("fromToken");
  const toToken = form.watch("toToken");
  const fromAmount = form.watch("fromAmount");

  const revenue = get(project, "revenue", 0);
  const swapPairAddress = get(project, "uniswapPair", "");
  const burnProgress = BigNumber(revenue)
    .dividedBy(BURN_TOKEN_SOFT_CAP[chainId || DEFAULT_CHAIN])
    .multipliedBy(100)
    .toNumber();
  const debouncedFromAmount = useDebounceState(fromAmount, 500);
  const buyToken = useBuyToken(project.tokenAddress);
  const sellToken = useSellToken(project.tokenAddress);
  const { data: ethBalanceInWei = { value: 0n }, refetch: refetchEthBalance } =
    useBalance({
      address,
    });
  const { data: tokenBalanceInWei } = useTokenBalance(
    project.tokenAddress as Address
  );

  const { data: pairReserves, refetch: refetchPairReserves } =
    useGetPairReserves(
      swapPairAddress as Address,
      project.tokenAddress as Address
    );

  const balances = {
    tokenBalance: tokenBalanceInWei ?? 0n,
    ethBalance: ethBalanceInWei?.value ?? 0n,
  };

  const toTokenInfo = getTokenInformation({
    tokenAddress: toToken,
    project,
    balances,
    pairReserves,
    chainId,
  });

  const fromTokenInfo = getTokenInformation({
    tokenAddress: fromToken,
    project,
    balances,
    pairReserves,
    chainId,
  });
  const isBuy = toToken === project.tokenAddress;

  const {
    data: quoteData = { amountOut: "0" },
    isFetching: isFetchingExpectedAmountOut,
  } = useTokenQuote({
    memeAddress: project.tokenAddress,
    amountIn: debouncedFromAmount,
    isBuy,
  });

  useEffect(() => {
    const expectedAmountOut =
      fromDecimals(quoteData.amountOut.toString()) || "";
    form.setValue("toAmount", expectedAmountOut);
  }, [quoteData, form.setValue]);

  const swapInputToken = () => {
    const newFromToken = toToken;
    const newToToken = fromToken;
    form.setValue("fromToken", newFromToken);
    form.setValue("toToken", newToToken);
  };

  const onSubmit = async (values: SwapFormSchema) => {
    try {
      setIsLoading(true);

      NiceModal.show(ModalProcessing);

      if (isBuy) {
        await buyToken.mutateAsync({
          amount: debouncedFromAmount,
          minimumReceive: values.toAmount,
        });
      } else {
        await sellToken.mutateAsync({
          amountIn: debouncedFromAmount,
          minimumReceive: values.toAmount,
        });
      }

      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalSuccess);
      form.reset({
        fromAmount: "0",
        toAmount: "0",
        fromToken: WRAPPED_SONIC_ADDRESS[chainId || DEFAULT_CHAIN],
        toToken: project.tokenAddress,
      });
      loopAsync(
        5,
        async () => {
          await queryClient.invalidateQueries({
            queryKey: getMemeControllerFindDetailQueryKey(project.tokenAddress),
          });
          await refetchEthBalance();
          await queryClient.invalidateQueries({
            queryKey: ["token-balance"],
          });
          await refetchPairReserves();
        },
        1000
      );
    } catch (error) {
      console.error(error);
      const errorMsg = get(error, "message", "");
      const isInsufficientOutput = errorMsg.includes(
        "INSUFFICIENT_OUTPUT_AMOUNT"
      );
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalError, {
        errorMsg: isInsufficientOutput
          ? "Swap failed due to insufficient output amount.\nTry increasing slippage and try again."
          : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValid =
    form.formState.isValid && isObjectEmpty(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full bg-background-surface backdrop-blur-[10px] rounded-[32px] border-white/[0.05] p-4 md:p-6">
          <div className="flex items-center mb-4 gap-4">
            <div className="relative flex w-fit">
              <IconGradientBox className="w-10 h-10 text-primary" />
              <IconSwap className="w-5 h-5 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-[20px] font-semibold text-app-white">Swap</h1>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              Current Tax:{" "}
              <span className="text-primary">
                {burnProgress >= 100 ? "1/1" : "5/5"}
              </span>
            </span>
            <div className="text-sm text-foreground flex items-center gap-2">
              Slippage
              <FormField
                control={form.control}
                name="slippage"
                rules={createRules([
                  rules.required("Slippage is required"),
                  rules.greaterThan(0, "Slippage must be greater than 0%"),
                  rules.max(50, "Slippage must be less than 50%"),
                ])}
                render={({ field }) => (
                  <FormItem className="flex relative space-y-0">
                    <FormControl>
                      <NumericInput
                        suffix="%"
                        className="w-[66px] py-1 px-4 !text-sm text-primary rounded-[4px] border border-white/10 bg-neutral-900 text-center h-7"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute top-full text-right right-0 text-[10px] w-48 !-mt-[2px]" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <CardContent className="p-0 mt-4">
            <FormField
              control={form.control}
              name="fromAmount"
              rules={createRules([
                rules.required("Please enter an amount to swap"),
                rules.greaterThan(0, "Please enter a valid amount"),
                rules.max(fromTokenInfo.balance, "Exceeded balance"),
              ])}
              render={({ field }) => (
                <FormItem className="p-3 rounded-[16px] bg-white/[0.05] flex flex-col items-end">
                  <FormLabel className="flex justify-between items-center gap-3 w-full">
                    <ImageWithFallback
                      src={fromTokenInfo.logo}
                      alt={fromTokenInfo.name}
                      key={fromTokenInfo.logo}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs leading-[16px] text-foreground">
                        From
                      </span>
                      <span className="text-base font-bold text-app-white">
                        {fromTokenInfo.symbol}
                      </span>
                    </div>
                    <span className="ml-auto text-sm text-foreground">
                      Balance:{" "}
                      <span className="text-app-white">
                        {toCurrency(fromTokenInfo.balance, { decimals: 2 })}
                      </span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <NumericInput
                      placeholder="0"
                      decimalScale={18}
                      {...field}
                      className="w-full text-right"
                    />
                  </FormControl>
                  <FormMessage />
                  <Button
                    variant="link"
                    className="text-primary text-sm ml-auto p-0 h-auto"
                    onClick={() =>
                      form.setValue("fromAmount", fromTokenInfo.balance)
                    }
                  >
                    MAX
                  </Button>
                </FormItem>
              )}
            />
            <div className="flex justify-center h-1 relative">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                  "rounded-full p-2 bg-primary hover:bg-primary/60",
                  "border border-solid border-[4px] border-background-surface",
                  "w-11 h-11",
                  "backdrop-blur-[10px]"
                )}
                onClick={swapInputToken}
              >
                <IconUpAndDown className="h-6 w-6 text-neutral-900" />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="toAmount"
              render={({ field }) => (
                <FormItem className="p-3 rounded-[16px] bg-white/[0.05]">
                  <FormLabel className="flex justify-between items-center gap-3">
                    <ImageWithFallback
                      src={toTokenInfo.logo}
                      alt={toTokenInfo.name}
                      key={toTokenInfo.logo}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs leading-[16px] text-foreground">
                        To
                      </span>
                      <span className="text-base font-bold text-app-white">
                        {toTokenInfo.symbol}
                      </span>
                    </div>
                    <span className="ml-auto text-sm text-foreground">
                      Balance:{" "}
                      <span className="text-app-white">
                        {toCurrency(toTokenInfo.balance, { decimals: 2 })}
                      </span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <NumericInput
                      placeholder="0"
                      decimalScale={18}
                      disabled
                      {...field}
                      className="w-full text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid || isFetchingExpectedAmountOut}
              loading={isLoading}
              className="w-full rounded-full bg-primary-light text-primary-dark text-sm font-bold py-3 px-6 h-11 mt-4"
            >
              Place Trade
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
