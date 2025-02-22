import { TOKEN_FACTORY_ADDRESS } from "@/lib/constants";
import { generateTokenId, sleep } from "@/lib/utils";
import { useMemeControllerCreateOffChainData } from "@/services/queries";
import { MemeFactoryAbi } from "@/smart-contracts/abi";
import { useMutation } from "@tanstack/react-query";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount, useConfig, useWriteContract } from "wagmi";

interface CreateTokenParams {
  logo: string;
  banner: string;
  telegram?: string;
  website?: string;
  twitter?: string;
  description?: string;
  tokenName: string;
  tokenSymbol: string;
}

const ensureHttps = (url: string | undefined) => {
  if (!url) return;

  return url.startsWith("https://") || url.startsWith("http://")
    ? url
    : `https://${url}`;
};

const CREATION_FEE = parseEther(import.meta.env.VITE_CREATION_FEE);

export function useCreateTokenOnchain() {
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();
  const saveOffchainData = useMemeControllerCreateOffChainData();
  const { chainId } = useAccount();

  return useMutation({
    mutationFn: async (params: CreateTokenParams) => {
      if (!params.tokenName || !params.tokenSymbol || !chainId) {
        throw new Error("Token name and symbol are required");
      }

      try {
        const tokenId = BigInt(generateTokenId());

        const calculatedTokenAddress = await readContract(config, {
          address: TOKEN_FACTORY_ADDRESS[chainId],
          abi: MemeFactoryAbi,
          functionName: "getMemeAddress",
          args: [tokenId],
        });

        await saveOffchainData.mutateAsync({
          data: {
            tokenAddress: calculatedTokenAddress as `0x${string}`,
            image: params.logo,
            telegram: ensureHttps(params.telegram),
            website: ensureHttps(params.website),
            x: ensureHttps(params.twitter),
            description: params.description || "",
          },
        });

        const hash = await writeContractAsync({
          address: TOKEN_FACTORY_ADDRESS[chainId],
          abi: MemeFactoryAbi,
          functionName: "createMeme",
          args: [
            {
              name: params.tokenName,
              symbol: params.tokenSymbol,
              tokenId,
            },
          ],
          value: CREATION_FEE,
        });

        const receipt = await waitForTransactionReceipt(config, { hash });

        if (receipt.status === "success") {
          // wait for backend indexer to index the token
          await sleep(5000);

          return {
            receipt,
            transactionHash: hash,
            tokenAddress: calculatedTokenAddress,
          };
        }
      } catch (error) {
        console.error("useCreateToken error", error);
        throw new Error("Failed to deploy token: Unknown error");
      }
    },
  });
}
