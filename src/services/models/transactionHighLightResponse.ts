/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * A8 Pump Fun API
 * OpenAPI spec version: 0.0.12
 */
import type { BaseMemeResponse } from "./baseMemeResponse";
import type { TransactionHighLightResponseType } from "./transactionHighLightResponseType";
import type { UserResponse } from "./userResponse";

export interface TransactionHighLightResponse {
  readonly amountNative: string;
  readonly amountToken: string;
  readonly created_at: string;
  readonly createdTime: number;
  readonly creator: string;
  readonly id: number;
  readonly memeInfo: BaseMemeResponse;
  readonly tokenAddress: string;
  readonly tx: string;
  readonly type: TransactionHighLightResponseType;
  readonly updated_at: string;
  readonly userInfo: UserResponse;
  readonly virtualNativeReserve: string;
  readonly virtualTokenReserve: string;
  readonly volume: string;
}
