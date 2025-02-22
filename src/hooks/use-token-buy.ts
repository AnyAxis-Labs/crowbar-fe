import { useMutation } from "@tanstack/react-query";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { maxUint256, parseEther } from "viem";
import { MemeAbi } from "@/smart-contracts/abi";

interface BuyTokenParams {
  amount: string; // A8 amount to spend
  minimumReceive: string; // Minimum tokens to receive
}

/**
 * Hook for buying tokens using swapExactIn (exact input amount)
 */
export const useBuyToken = (memeAddress: string) => {
  const config = useConfig();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  return useMutation({
    mutationFn: async (params: BuyTokenParams) => {
      const { amount, minimumReceive } = params;

      if (!address) {
        throw new Error("No address found");
      }

      try {
        const amountInWei = parseEther(amount);
        const hash = await writeContractAsync({
          address: memeAddress as `0x${string}`,
          abi: MemeAbi,
          functionName: "swapExactIn",
          args: [
            amountInWei, // amountIn
            parseEther(minimumReceive), // minimumReceive
            true, // isBuyToken = true for buying
            address,
          ],
          value: amountInWei,
        });

        const receipt = await waitForTransactionReceipt(config, { hash });

        if (receipt.status === "success") {
          return {
            receipt,
            transactionHash: hash,
          };
        }

        throw new Error("Transaction failed");
      } catch (error) {
        console.error("useBuyToken error", error);
        if (error instanceof Error) {
          throw new Error(`Failed to buy token: ${error.message}`);
        }
        throw new Error("Failed to buy token: Unknown error");
      }
    },
  });
};
