import { TOKEN_FACTORY_ADDRESS } from "@/lib/constants";
import { MemeAbi, MemeFactoryAbi } from "@/smart-contracts/abi";
import { useQuery } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount, useConfig } from "wagmi";

interface QuoteResult {
  actualAmountIn: string;
  amountOut: string;
  nativeFee: string;
  refund: string;
}

interface UseTokenQuoteParams {
  memeAddress?: string;
  amountIn?: string;
  isBuy?: boolean;
}

/**
 * Hook to get quote for buying or selling tokens
 * @param params.memeAddress Address of the token pair
 * @param params.amountIn Amount of input tokens
 * @param params.isBuy True for buying, false for selling
 */
export function useTokenQuote({
  memeAddress,
  amountIn,
  isBuy = true,
}: UseTokenQuoteParams) {
  const config = useConfig();
  const { chainId } = useAccount();

  return useQuery({
    queryKey: ["token-quote", memeAddress, amountIn, isBuy],
    queryFn: async () => {
      if (!chainId) throw new Error("Chain ID is required");
      if (!memeAddress) throw new Error("Meme address is required");

      const pumpContract = await readContract(config, {
        address: TOKEN_FACTORY_ADDRESS[chainId],
        abi: MemeFactoryAbi,
        functionName: "getPumpContractAddress",
        args: [memeAddress as `0x${string}`],
      });

      const quote = await readContract(config, {
        address: pumpContract as `0x${string}`,
        abi: MemeAbi,
        functionName: "quoteAmountOut",
        args: [parseEther(amountIn || "0"), isBuy],
      });

      const formattedQuote: QuoteResult = {
        actualAmountIn: String(quote?.[0] ?? "0"),
        amountOut: String(quote?.[1] ?? "0"),
        nativeFee: String(quote?.[2] ?? "0"),
        refund: String(quote?.[3] ?? "0"),
      };

      return formattedQuote;
    },
  });
}
