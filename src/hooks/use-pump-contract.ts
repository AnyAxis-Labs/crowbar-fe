import { DEFAULT_CHAIN, TOKEN_FACTORY_ADDRESS } from "@/lib/constants";
import { MemeFactoryAbi } from "@/smart-contracts/abi";
import { useAccount, useReadContract } from "wagmi";

export const usePumpContract = (memeAddress: string) => {
  const { chainId } = useAccount();

  return useReadContract({
    address: TOKEN_FACTORY_ADDRESS[chainId || DEFAULT_CHAIN],
    abi: MemeFactoryAbi,
    functionName: "getPumpContractAddress",
    args: [memeAddress as `0x${string}`],
    query: {
      enabled: !!chainId,
    },
  });
};
