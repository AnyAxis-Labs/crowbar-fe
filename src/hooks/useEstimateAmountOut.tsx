import { UniswapV2RouterAbi } from "@/smart-contracts/abi";
import { mainnet } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { UNISWAP_V2_ROUTER_ADDRESS } from "@/lib/constants";

interface Props {
  amountIn: bigint;
  reserveIn: bigint;
  reserveOut: bigint;
}

// @Docs: input and output are in wei
export const useEstimateAmountOut = ({ amountIn, reserveIn, reserveOut }: Props) => {
  const { chainId } = useAccount();

  const { data: amountOut, isFetching } = useReadContract({
    abi: UniswapV2RouterAbi,
    address: UNISWAP_V2_ROUTER_ADDRESS[chainId || mainnet.id],
    functionName: "getAmountOut",
    args: [amountIn, reserveIn, reserveOut],
  });

  return { data: (amountOut as bigint) || 0n, isFetching };
};
