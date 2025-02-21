import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { sonic, sonicBlazeTestnet } from "@/lib/chains";
import { Toaster } from "sonner";

import { config } from "./wagmi.ts";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const router = createRouter({ routeTree });

// 1. Your WalletConnect Cloud project ID
const projectId = "08d707096992f48067945b9b6c261788";

// 2. Create wagmiConfig
const metadata = {
  name: "tax-farm",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sonic, sonicBlazeTestnet] as const;
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: false,
    socials: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  defaultChain: sonicBlazeTestnet,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
});

// Render the app
const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            theme="light"
            offset={28}
            richColors
            style={{
              width: "398px",
            }}
          />
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
