import { useReadContract } from "wagmi";
import { parseEther } from "viem";
import { MemeAbi } from "@/smart-contracts/abi";

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
  const { data, refetch, isFetching, isFetched, error } = useReadContract({
    address: memeAddress as `0x${string}`,
    abi: MemeAbi,
    functionName: "quoteAmountOut",
    args: [parseEther(amountIn || "0"), isBuy],
    query: {
      enabled: Boolean(memeAddress && amountIn),
    },
  });

  console.log(
    memeAddress,
    parseEther(amountIn || "0"),
    isBuy,
    data,
    isFetched,
    error
  );

  const formattedData: QuoteResult = {
    actualAmountIn: String(data?.[0] ?? "0"),
    amountOut: String(data?.[1] ?? "0"),
    nativeFee: String(data?.[2] ?? "0"),
    refund: String(data?.[3] ?? "0"),
  };

  return {
    data: formattedData,
    refetch,
    isFetching,
  };
}
