import { useState } from "react";
import { erc20Abi } from "viem";
import { mainnet } from "viem/chains";
import { get } from "es-toolkit/compat";
import NiceModal from "@ebay/nice-modal-react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useConfig, useReadContracts, useWriteContract } from "wagmi";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fromDecimals, toCurrency } from "@/lib/number";
import { STAKING_CONTRACT_ADDRESS, STAKING_TOKEN_ADDRESS } from "@/lib/constants";
import { TokenStakingAbi } from "@/smart-contracts/abi";
import { ModalProcessing } from "@/components/shared/modal-processing";
import { ModalSuccess } from "@/components/shared/modal-success";
import { ModalError } from "@/components/shared/modal-error";

export function ClaimRewardForm() {
  const [isLoading, setIsLoading] = useState(false);

  const config = useConfig();
  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const stakingContractAddress = STAKING_CONTRACT_ADDRESS[chainId || mainnet.id];

  const { data: stakeTokenData } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: STAKING_TOKEN_ADDRESS[chainId || mainnet.id],
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: STAKING_TOKEN_ADDRESS[chainId || mainnet.id],
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });

  const { data: protocolTotalRewardData, refetch: refetchProtocolTotalReward } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: stakingContractAddress,
        abi: TokenStakingAbi,
        functionName: "totalRewards",
        chainId,
      },
    ],
  });

  const { data: userRewardsData, refetch: refetchUserRewards } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: stakingContractAddress,
        abi: TokenStakingAbi,
        functionName: "getUserRewards",
        args: address ? [address] : undefined,
        chainId,
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

  const decimals = get(stakeTokenData, 0, 18);
  const symbol = get(stakeTokenData, 1, "UNI");
  const protocolTotalRewardInWei = get(protocolTotalRewardData, 0, 0n) as bigint;
  const userRewardsInWei = get(userRewardsData, 0, 0n) as bigint;
  const userStakedAmountInWei = get(userStakedInfos, [0, 0], 0n) as bigint;

  const protocolTotalReward = fromDecimals(protocolTotalRewardInWei.toString() || "0", 18);
  const userRewards = fromDecimals(userRewardsInWei.toString() || "0", 18);
  const userStakedAmount = fromDecimals(userStakedAmountInWei.toString() || "0", decimals);

  const stats = [
    { label: "Staked Amount", value: toCurrency(userStakedAmount, { suffix: ` ${symbol}` }) },
    { label: "Total Rewards", value: toCurrency(protocolTotalReward, { suffix: " ETH" }) },
    { label: "Available to Claim", value: toCurrency(userRewards, { suffix: " ETH" }) },
  ];

  async function onSubmit() {
    if (!address) return;

    try {
      setIsLoading(true);
      NiceModal.show(ModalProcessing);

      const txHash = await writeContractAsync({
        abi: TokenStakingAbi,
        address: stakingContractAddress,
        functionName: "claim",
        chainId,
      });
      await waitForTransactionReceipt(config, { hash: txHash });
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalSuccess);
      refetchUserRewards();
      refetchUserStakedInfos();
      refetchProtocolTotalReward();
    } catch (error) {
      console.error(error);
      NiceModal.hide(ModalProcessing);
      NiceModal.show(ModalError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/10 p-4 flex flex-col gap-2 rounded-[16px]">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm">{stat.label}</span>
            <span className="text-sm font-medium text-primary">{stat.value}</span>
          </div>
        ))}
      </Card>
      <Button
        type="submit"
        className="w-full text-primary-dark font-bold text-[18px] rounded-[16px] h-[56px]"
        onClick={onSubmit}
        loading={isLoading}
        disabled={userRewardsInWei === 0n}
      >
        Claim
      </Button>
    </div>
  );
}
