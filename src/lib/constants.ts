import type { Address } from "viem";
import { sonic, sonicBlazeTestnet } from "./chains";

export const TOKEN_FACTORY_ADDRESS = {
  [sonic.id]: "0x0000000000000000000000000000000000000000",
  [sonicBlazeTestnet.id]: "0x4C617F49EA1dB6d1c8F50700B0AbA47a3EFC964f",
} as Record<number, Address>;

export const STAKING_CONTRACT_ADDRESS = {
  [sonic.id]: "0x0000000000000000000000000000000000000000",
  [sonicBlazeTestnet.id]: "0x0000000000000000000000000000000000000000",
} as Record<number, Address>;

export const STAKING_TOKEN_ADDRESS = {
  [sonic.id]: "0x0000000000000000000000000000000000000000",
  [sonicBlazeTestnet.id]: "0x0000000000000000000000000000000000000000",
} as Record<number, Address>;

export const UNISWAP_V2_ROUTER_ADDRESS = {
  [sonic.id]: "0x0000000000000000000000000000000000000000",
  [sonicBlazeTestnet.id]: "0x0000000000000000000000000000000000000000",
} as Record<number, Address>;

export const WRAPPED_ETH_ADDRESS = {
  [sonic.id]: "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
  [sonicBlazeTestnet.id]: "0x309C92261178fA0CF748A855e90Ae73FDb79EBc7",
} as Record<number, Address>;

export const WRAPPED_SONIC_ADDRESS = {
  [sonic.id]: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
  [sonicBlazeTestnet.id]: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
} as Record<number, Address>;

export const BURN_TOKEN_SOFT_CAP = {
  [sonic.id]: 1,
  [sonicBlazeTestnet.id]: 0.01,
} as Record<number, number>;

export const WETH_IMAGE =
  "https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png";

export const SONIC_IMAGE =
  "https://s2.coinmarketcap.com/static/img/coins/128x128/32684.png"; // WSONIC: 34753.png

export const DEFAULT_CHAIN = sonicBlazeTestnet.id;
