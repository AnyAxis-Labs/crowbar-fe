import { readContract, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import type { Address } from "viem";

import { config } from "@/wagmi";

import { TokenLogicV2Abi } from "./abi";

interface ApproveAmountParams {
  scAddress: Address;
  account: string;
  spenderAddress: string;
  amount: bigint;
}

async function approve(params: ApproveAmountParams) {
  const allowanceAmount = await readContract(config, {
    address: params.scAddress as `0x${string}`,
    functionName: "allowance",
    abi: TokenLogicV2Abi,
    args: [params.account, params.spenderAddress],
  });

  const bnAllowance = BigNumber((allowanceAmount as bigint).toString());
  const bnAmount = BigNumber(params.amount.toString());

  if (bnAllowance.gte(bnAmount)) {
    return true;
  }

  const approvedHash = await writeContract(config, {
    address: params.scAddress as `0x${string}`,
    functionName: "approve",
    abi: TokenLogicV2Abi,
    args: [params.spenderAddress, params.amount],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: approvedHash,
  });
  if (receipt.status === "success") {
    return true;
  }
  return false;
}

export const TokenContract = {
  approve,
};
