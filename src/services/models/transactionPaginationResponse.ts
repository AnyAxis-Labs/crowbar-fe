/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * A8 Pump Fun API
 * OpenAPI spec version: 0.0.12
 */
import type { BaseTransactionResponse } from "./baseTransactionResponse";

export interface TransactionPaginationResponse {
  readonly data: readonly BaseTransactionResponse[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
}
