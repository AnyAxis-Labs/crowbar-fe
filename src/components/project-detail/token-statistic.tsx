import NiceModal from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { get } from "es-toolkit/compat";
import { DateTime } from "luxon";
import { useLayoutEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";

import {
  IconArrowUpRight,
  IconGradientBox,
  IconStatistic,
} from "@/components/icons";
import { ModalDisclaimer } from "@/components/shared/modal-disclaimer";
import { ModalError } from "@/components/shared/modal-error";
import { ModalProcessing } from "@/components/shared/modal-processing";
import { ModalSuccess } from "@/components/shared/modal-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BURN_TOKEN_SOFT_CAP,
  DEFAULT_CHAIN,
  TOKEN_FACTORY_ADDRESS,
} from "@/lib/constants";
import { toCurrency } from "@/lib/number";
import { getTimeDifference, padZero } from "@/lib/utils";
import type { TaxFarmResponse } from "@/services/models";
// import {
//   getTaxFarmControllerFindOneQueryKey,
//   useTaxFarmControllerUpdate,
// } from "@/services/queries";
import { TokenFactoryV2Abi } from "@/smart-contracts/abi";

export const TokenStatistic = ({ project }: { project: TaxFarmResponse }) => {
  const revenue = get(project, "revenue", 0);
  const tokenCreateTime = get(project, "createTime", 0);
  const chainId = useChainId();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();
  // const updateProject = useTaxFarmControllerUpdate();
  // const queryClient = useQueryClient();
  const currentChainConfig = config.chains.find(
    (chain) => chain.id === chainId
  );

  const isOwner = address === project.creator;

  const [isWithdrawLiquidityLoading, setIsWithdrawLiquidityLoading] =
    useState(false);

  const burnProgress = BigNumber(revenue)
    .dividedBy(BURN_TOKEN_SOFT_CAP[chainId])
    .multipliedBy(100)
    .toNumber();
  const burnCountdownEndTime = DateTime.fromSeconds(tokenCreateTime).plus({
    days: 1,
  });
  const isBurnCountdownEnded = DateTime.now() > burnCountdownEndTime;
  const isWithdrawnLiquidity = get(project, "txWithdraw", null);
  const txBurn = get(project, "txBurn", null);

  const [burnCountdown, setBurnCountdown] = useState(getTimeDifference(0));

  useInterval(() => {
    const burnCountdown = getTimeDifference(burnCountdownEndTime.toMillis());
    setBurnCountdown(burnCountdown);
  }, 1000);

  useLayoutEffect(() => {
    if (isBurnCountdownEnded && burnProgress < 100) {
      NiceModal.hide(ModalDisclaimer);
      NiceModal.show(ModalDisclaimer);
    }
  }, [isBurnCountdownEnded, burnProgress]);

  const submitWithdrawLiquidity = async () => {
    if (!address || !isOwner) {
      return;
    }

    try {
      setIsWithdrawLiquidityLoading(true);
      NiceModal.show(ModalProcessing);

      const txHash = await writeContractAsync({
        abi: TokenFactoryV2Abi,
        address: TOKEN_FACTORY_ADDRESS[chainId || DEFAULT_CHAIN],
        functionName: "withdrawLiquidity",
        args: [project.tokenAddress],
      });
      await waitForTransactionReceipt(config, { hash: txHash });
      // await updateProject.mutateAsync({
      //   data: {
      //     txWithdraw: txHash,
      //     tokenAddress: project.tokenAddress,
      //   },
      // });
      // await queryClient.invalidateQueries({
      //   queryKey: getTaxFarmControllerFindOneQueryKey(project.tokenAddress),
      // });
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalSuccess);
    } catch (error) {
      console.error(error);
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalError);
    } finally {
      setIsWithdrawLiquidityLoading(false);
    }
  };

  return (
    <Card className="w-full bg-background-surface backdrop-blur-[10px] rounded-[32px] border-white/[0.05] p-4 md:p-6">
      <div className="flex items-center mb-4 gap-4">
        <div className="relative flex w-fit">
          <IconGradientBox className="w-10 h-10 text-primary" />
          <IconStatistic className="w-5 h-5 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h1 className="text-[20px] font-semibold text-app-white">
          Token Statistics
        </h1>
      </div>
      <CardContent className="space-y-4 p-0">
        <div className="flex justify-between">
          <span className="text-sm text-foreground">Token Revenue</span>
          <span className="text-sm text-primary font-semibold">
            {toCurrency(project.revenue, { decimals: 2, suffix: " ETH" })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-foreground">
            Burn Progress:{" "}
            <span className="text-primary font-medium">
              {burnProgress.toFixed(2)}%
            </span>
          </span>
          {txBurn ? (
            <a
              href={`${currentChainConfig?.blockExplorers?.default.url}/tx/${txBurn}`}
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-sm text-primary font-semibold underline">
                Etherscan
              </span>
              <IconArrowUpRight />
            </a>
          ) : (
            <span className="text-sm text-primary font-semibold">
              {toCurrency(revenue, { decimals: 2 })}/
              {BURN_TOKEN_SOFT_CAP[chainId]} ETH
            </span>
          )}
        </div>

        <Progress value={burnProgress} className="h-4" />

        <p className="text-sm text-foreground">
          When the token will have generated enough fees for the creator, the
          liquidity will <span className="text-primary underline">burned</span>.
        </p>
        <p className="text-sm text-foreground">
          If the token does not generate enough fees within{" "}
          <span className="text-primary underline">24 hours</span>, the
          liquidity will be{" "}
          <span className="text-primary underline">withdrawn</span> and sent
          back to the creator's wallet.
        </p>

        {burnProgress < 100 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center p-5 border border-white/[0.05] rounded-[16px] bg-[#0A0A0A]">
              <div className="text-[24px] font-semibold text-primary tabular-nums">
                {padZero(burnCountdown.days)}
              </div>
            </div>
            <div className="text-[24px] font-semibold text-primary">:</div>
            <div className="flex items-center justify-center p-5 border border-white/[0.05] rounded-[16px] bg-[#0A0A0A]">
              <div className="text-[24px] font-semibold text-primary tabular-nums">
                {padZero(burnCountdown.hours)}
              </div>
            </div>
            <div className="text-[24px] font-semibold text-primary">:</div>
            <div className="flex items-center justify-center p-5 border border-white/[0.05] rounded-[16px] bg-[#0A0A0A]">
              <div className="text-[24px] font-semibold text-primary tabular-nums">
                {padZero(burnCountdown.minutes)}
              </div>
            </div>
            <div className="text-[24px] font-semibold text-primary">:</div>
            <div className="flex items-center justify-center p-5 border border-white/[0.05] rounded-[16px] bg-[#0A0A0A]">
              <div className="text-[24px] font-semibold text-primary tabular-nums">
                {padZero(burnCountdown.seconds)}
              </div>
            </div>
          </div>
        )}

        {burnProgress >= 100 && (
          <button
            type="button"
            className="w-full py-3 text-[#E32A2B] font-semibold rounded-[16px] burnt-button border border-white/10 text-[24px] font-semibold h-[76px]"
          >
            LP Burned
          </button>
        )}

        {!isWithdrawnLiquidity &&
          isBurnCountdownEnded &&
          burnProgress < 100 &&
          isOwner && (
            <Button
              type="submit"
              className="w-full text-primary-dark font-bold text-[18px] rounded-full h-[56px]"
              onClick={submitWithdrawLiquidity}
              loading={isWithdrawLiquidityLoading}
            >
              Withdraw Liquidity
            </Button>
          )}
      </CardContent>
    </Card>
  );
};
