import { NearContract } from "../near";
import { AccountId, NearService } from "../types";
import { AppchainId } from "./types";

export class RegistryContract extends NearContract {

	constructor(contractId: AccountId, nearSerice: NearService) {
		super(contractId, nearSerice)
	}

	get_appchain_ids(): Promise<AppchainId[]> {
		return this.nearService.viewer.view(
			{
				contractId: this.contractId,
				methodName: "get_appchain_ids",
			}
		)
	}

	get_appchain_contract_id(appchain_id: AppchainId): AccountId {
		return `${appchain_id}.${this.contractId}`
	}

}