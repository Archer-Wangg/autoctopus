import { Near, NearConfig } from "near-api-js/lib/near";
import { keyStores } from "near-api-js";
import { MultiSendAccount } from "multi-transaction";

export interface Config {
  near: NearConfig;
  namesky: {
    coreContractId: string;
    mintPrivateKey: string;
  };
}

export interface NearService {
  near: Near;
  keyStore: keyStores.InMemoryKeyStore;
  viewer: MultiSendAccount;
}

export type AccountId = string
export type U128 = string
export type U64 = string
