import { connect, KeyPair, keyStores } from "near-api-js";
import { getConfig } from "./config";
import { MultiSendAccount } from "multi-transaction";
import { AccountId, NearService } from "./types";

let nearService: NearService | undefined;

export async function initNearService(): Promise<NearService> {
  if (!nearService) {
    const config = getConfig();
    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey(
      config.near.networkId,
      config.autoctopus.contractId,
      KeyPair.fromString(config.autoctopus.privateKey)
    );
    const near = await connect({
      ...config.near,
      keyStore,
    });
    const viewer = new MultiSendAccount(near.connection);
    nearService = { near, viewer, keyStore };
  }
  return nearService;
}

export class NearContract {
	nearService: NearService
	contractId: AccountId
	constructor(contractId: AccountId, nearService: NearService) {
		this.contractId = contractId
		this.nearService = nearService
	}

}