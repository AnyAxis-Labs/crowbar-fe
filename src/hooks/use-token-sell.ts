import { MemeAbi } from "@/smart-contracts/abi";
import { useMutation } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { usePumpContract } from "./use-pump-contract";
import { useTokenApproval } from "./use-token-approval";

interface SellTokenParams {
  amountIn: string;
  minimumReceive: string;
}

export function useSellToken(memeAddress: string) {
  const config = useConfig();
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: pumpContract } = usePumpContract(memeAddress);
  const { checkNeedsApproval, approve } = useTokenApproval(
    memeAddress,
    pumpContract
  );

  return useMutation({
    mutationFn: async (params: SellTokenParams) => {
      if (!userAddress) {
        throw new Error("User address not found");
      }

      if (!pumpContract) {
        throw new Error("Pump contract not found");
      }

      const { amountIn, minimumReceive } = params;

      // Check if approval is needed
      if (checkNeedsApproval(parseEther(amountIn))) {
        await approve(parseEther(amountIn));
      }

      try {
        // Execute the sell transaction
        const hash = await writeContractAsync({
          address: pumpContract,
          abi: MemeAbi,
          functionName: "swapExactIn",
          args: [
            parseEther(amountIn),
            parseEther(minimumReceive),
            false, // isBuyToken = false for selling
            userAddress,
          ],
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
        console.error("useTokenSell error", error);
        if (error instanceof Error) {
          throw new Error(`Failed to sell token: ${error.message}`);
        }
        throw new Error("Failed to sell token: Unknown error");
      }
    },
  });
}
