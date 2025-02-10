import { useForm } from "react-hook-form";
import BigNumber from "bignumber.js";
import { useAccount, useConfig, useReadContracts, useWriteContract } from "wagmi";
import { mainnet } from "viem/chains";
import { get } from "es-toolkit/compat";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { erc20Abi } from "viem";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectToken } from "@/components/staking/select-token";
import { cn, isObjectEmpty } from "@/lib/utils";
import StakingStats from "@/components/staking/staking-stats";
import { NumericInput } from "@/components/shared/numeric-input";
import { fromDecimals, toBigInt, toCurrency, toDecimals } from "@/lib/number";
import { createRules, rules } from "@/lib/form";
import { STAKING_CONTRACT_ADDRESS, STAKING_TOKEN_ADDRESS } from "@/lib/constants";
import { TokenStakingAbi } from "@/smart-contracts/abi";
import { ModalProcessing } from "@/components/shared/modal-processing";
import { ModalSuccess } from "@/components/shared/modal-success";
import { ModalError } from "@/components/shared/modal-error";
import { TokenContract } from "@/smart-contracts/TokenContract";
import { useTokenBalance } from "@/hooks/useTokenBalance";

type StakeFormSchema = {
  amount: string;
};

export function StakeForm() {
  const form = useForm<StakeFormSchema>({
    mode: "all",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const stakingTokenAddress = STAKING_TOKEN_ADDRESS[chainId || mainnet.id];
  const stakingContractAddress = STAKING_CONTRACT_ADDRESS[chainId || mainnet.id];
  const isStakingTokenNotSet = stakingTokenAddress === "0xFIXME";

  const { data: userTokenBalanceInWei = 0n, refetch: refetchUserTokenBalance } =
    useTokenBalance(stakingTokenAddress);

  const { data: stakeTokenData } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: stakingTokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: stakingTokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });

  const { data: userStakedInfos, refetch: refetchUserStakedInfos } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: stakingContractAddress,
        abi: TokenStakingAbi,
        functionName: "stakersInfos",
        args: address ? [address] : undefined,
        chainId,
      },
    ],
  });

  const { data: totalStakedData, refetch: refetchTotalStaked } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: stakingContractAddress,
        abi: TokenStakingAbi,
        functionName: "totalStaked",
        chainId,
      },
    ],
  });

  const decimals = get(stakeTokenData, 0, 18);
  const symbol = get(stakeTokenData, 1, "UNI");
  const userStakedAmount = get(userStakedInfos, [0, 0], 0);
  const totalStaked = get(totalStakedData, 0, 0) as number;

  const undecimaledBalance = fromDecimals(userTokenBalanceInWei.toString() || "0", decimals);
  const undecimaledTotalStaked = fromDecimals(totalStaked.toString() || "0", decimals);
  const undecimaledUserStaked = fromDecimals(userStakedAmount.toString() || "0", decimals);

  const updateTokenAmountByPercentage = (percentage: number) => {
    const amount = BigNumber(undecimaledBalance).multipliedBy(percentage).toString();
    form.setValue("amount", amount);
  };

  async function onSubmit(values: StakeFormSchema) {
    if (!address) return;
    if (isStakingTokenNotSet) {
      return;
    }

    try {
      setIsLoading(true);

      NiceModal.show(ModalProcessing);

      const approved = await TokenContract.approve({
        scAddress: stakingTokenAddress,
        account: address,
        spenderAddress: stakingContractAddress,
        amount: toBigInt(toDecimals(values.amount, decimals)),
      });

      if (!approved) {
        throw new Error("Approve failed");
      }

      const txHash = await writeContractAsync({
        abi: TokenStakingAbi,
        functionName: "stake",
        account: address,
        args: [toDecimals(values.amount, decimals)],
        address: stakingContractAddress,
      });
      await waitForTransactionReceipt(config, { hash: txHash });

      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalSuccess);
      form.reset({ amount: "" });
      refetchUserStakedInfos();
      refetchTotalStaked();
      refetchUserTokenBalance();
    } catch (error) {
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalError);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const isValid = form.formState.isValid && isObjectEmpty(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <h2 className="text-app-white text-base md:text-[20px] font-medium">Stake Tokens</h2>
        <FormField
          control={form.control}
          name="amount"
          rules={createRules([
            rules.required("Please enter an amount to stake"),
            rules.greaterThan(0, "Please enter a valid amount"),
            rules.max(undecimaledBalance, "Exceeded balance"),
          ])}
          render={({ field }) => {
            return (
              <FormItem>
                <Card className="rounded-[16px] p-4 flex flex-col gap-2 border-white/10 bg-neutral-900">
                  <FormLabel className="flex flex-row items-center justify-between text-sm flex-wrap">
                    <span>Deposit</span>
                    <span>
                      Balance:{" "}
                      <span className="text-primary">{toCurrency(undecimaledBalance)}</span>{" "}
                      {symbol}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <NumericInput
                        placeholder="0"
                        {...field}
                        className="h-[52px] border border-solid rounded-[12px] p-1 pl-4 border-white/10 text-sm bg-neutral-900 focus:border-primary text-white"
                      />
                      <div className="absolute top-0 bottom-0 right-0 p-1">
                        <SelectToken />
                      </div>
                    </div>
                  </FormControl>
                  <div className="flex gap-2 ml-auto">
                    {[0.2, 0.5, 0.7, 1].map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        className={cn(
                          "p-2 text-sm text-primary bg-transparent border-[1px] border-white/10 rounded-3xl",
                          "transition-opacity duration-300",
                          "hover:opacity-70 active:opacity-10",
                          "w-[56px] h-[38px]",
                        )}
                        onClick={() => updateTokenAmountByPercentage(value)}
                      >
                        {value === 1 ? "Max" : `${value * 100}%`}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </Card>
              </FormItem>
            );
          }}
        />
        <StakingStats
          symbol={symbol}
          stats={{
            available: undecimaledBalance,
            staked: undecimaledUserStaked,
            tvl: undecimaledTotalStaked,
          }}
        />
        <Button
          type="submit"
          disabled={!isValid || isStakingTokenNotSet}
          loading={isLoading}
          className="w-full text-primary-dark font-bold text-[18px] rounded-[16px] h-[56px]"
        >
          Stake
        </Button>
      </form>
    </Form>
  );
}
