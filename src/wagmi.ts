import { http, createConfig, type Config } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config: Config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http("https://eth-sepolia.public.blastapi.io"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
