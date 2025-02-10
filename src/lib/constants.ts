import type { Address } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const TOKEN_FACTORY_ADDRESS = {
  [mainnet.id]: "0xfD8Bdb0A75051D721Ed360Fad0652857b22aE5d2",
  [sepolia.id]: "0x4fBe617607fa3aE96eC175B52735d488Af8d697a",
} as Record<number, Address>;

export const STAKING_CONTRACT_ADDRESS = {
  [mainnet.id]: "0xFIXME",
  [sepolia.id]: "0x935d73fb05765b23B4dEb5b5e8B12e28f9112AbD",
} as Record<number, Address>;

export const STAKING_TOKEN_ADDRESS = {
  [mainnet.id]: "0xFIXME",
  [sepolia.id]: "0x27f6095f6492f074767E5dC064B5C68EC4e88966",
} as Record<number, Address>;

export const UNISWAP_V2_ROUTER_ADDRESS = {
  [mainnet.id]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  [sepolia.id]: "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008",
} as Record<number, Address>;

export const WRAPPED_ETH_ADDRESS = {
  [mainnet.id]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  [sepolia.id]: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
} as Record<number, Address>;

export const BURN_TOKEN_SOFT_CAP = {
  [mainnet.id]: 1,
  [sepolia.id]: 0.01,
} as Record<number, number>;
