import { MemeAbi } from "@/smart-contracts/abi";
import { useMutation } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { usePumpContract } from "./use-pump-contract";

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
  const { data: pumpContract } = usePumpContract(memeAddress);

  return useMutation({
    mutationFn: async (params: BuyTokenParams) => {
      const { amount, minimumReceive } = params;

      if (!address) {
        throw new Error("No address found");
      }

      if (!pumpContract) {
        throw new Error("Pump contract not found");
      }

      try {
        const amountInWei = parseEther(amount);
        const hash = await writeContractAsync({
          address: pumpContract,
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
