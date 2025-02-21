import { http, createConfig, type Config } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { sonic, sonicBlazeTestnet } from "@/lib/chains";

export const config: Config = createConfig({
  chains: [sonic, sonicBlazeTestnet],
  connectors: [
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [sonic.id]: http(sonic.rpcUrls.default.http[0]),
    [sonicBlazeTestnet.id]: http(sonicBlazeTestnet.rpcUrls.default.http[0]),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
