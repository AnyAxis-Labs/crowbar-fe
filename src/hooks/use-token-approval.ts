import { erc20Abi } from "viem";
import { useConfig, useReadContract, useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { useMemo, useCallback } from "react";

export function useTokenApproval(
  tokenAddress?: string,
  spenderAddress?: string
) {
  const { address: userAddress } = useAccount();
  const config = useConfig();

  // Memoize enabled flag to prevent unnecessary query updates
  const isEnabled = useMemo(
    () => Boolean(tokenAddress && spenderAddress && userAddress),
    [tokenAddress, spenderAddress, userAddress]
  );

  // Check current allowance
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract(
    {
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: isEnabled
        ? [userAddress as `0x${string}`, spenderAddress as `0x${string}`]
        : undefined,
      query: {
        enabled: isEnabled,
        staleTime: 5_000,
      },
    }
  );

  // Function to check if approval is needed for a specific amount
  const checkNeedsApproval = useCallback(
    (amount?: bigint) => {
      if (!amount || currentAllowance === undefined) return false;
      return currentAllowance < amount;
    },
    [currentAllowance]
  );

  // Approve function that takes amount parameter
  const handleApprove = useCallback(
    async (amount: bigint) => {
      if (!tokenAddress || !spenderAddress || !amount) {
        throw new Error("Missing required parameters for approval");
      }

      try {
        const hash = await writeContract(config, {
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [spenderAddress as `0x${string}`, amount],
        });

        await waitForTransactionReceipt(config, { hash });
        await refetchAllowance();

        return hash;
      } catch (error) {
        console.error("Approval failed:", error);
        throw error;
      }
    },
    [tokenAddress, spenderAddress, refetchAllowance, config]
  );

  return useMemo(
    () => ({
      currentAllowance,
      checkNeedsApproval,
      approve: handleApprove,
    }),
    [currentAllowance, checkNeedsApproval, handleApprove]
  );
}
