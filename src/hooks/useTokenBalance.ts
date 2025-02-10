import { readContract } from "@wagmi/core";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useConfig } from "wagmi";
import { type Address, erc20Abi } from "viem";

export const useTokenBalance = (tokenAddress: Address) => {
  const { address } = useAccount();
  const config = useConfig();

  return useQuery({
    queryKey: ["token-balance", tokenAddress],
    queryFn: async () => {
      if (!address) return 0n;

      const balance = await readContract(config, {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });

      return balance;
    },
    enabled: !!address,
    staleTime: 1000 * 60, // 1 minutes
  });
};
