export type HomeFilter = "bonding-curve" | "dex-listed";
export type SortBy = "creation-time" | "trading-volume" | "market-cap";
export type SortOrder = "ASC" | "DESC";

export type HomeSearch = {
  type?: HomeFilter;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  search?: string;
  page?: number;
};

export type ProfileSearch = {
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  search?: string;
  page?: number;
};

export interface Token {
  id: number;
  title: string;
  thumbnail: string;
  banner: string;
  creator: {
    name: string;
    address: string;
    image: string;
  };
  tokenRevenue: string;
  marketCap: string;
  percentage: number;
  token: {
    name: string;
    symbol: string;
    decimals: number;
    image: string;
  };
  description: string;
}
