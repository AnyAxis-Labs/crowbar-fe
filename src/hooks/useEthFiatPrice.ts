import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ETH_PRICE_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

const fetchEthPrice = async (): Promise<number> => {
  const response = await axios.get(ETH_PRICE_API);
  return response.data.ethereum.usd;
};

export const useEthFiatPrice = () => {
  return useQuery({
    queryKey: ["ethPrice"],
    queryFn: fetchEthPrice,
    staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
    refetchOnWindowFocus: false,
  });
};
