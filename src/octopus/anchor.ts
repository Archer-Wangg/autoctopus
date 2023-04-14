import { NearContract } from "../near"
import { AccountId, NearService } from "../types"
import { AppchainDelegator, AppchainValidator, ValidatorAndHisDelegators } from "./types"

export class AnchorContract extends NearContract {

	constructor(contractId: AccountId, nearSerice: NearService) {
		super(contractId, nearSerice)
	}

	get_validator_list_of(era_number: number | undefined): Promise<AppchainValidator[]> {
		return this.nearService.viewer.view({
			contractId: this.contractId,
			methodName: "get_validator_list_of",
			args: {
				era_number: era_number?.toString()
			},
		})
	}
	get_delegators_of_validator_in_era(era_number: number | undefined, validator_id: AccountId): Promise<AppchainDelegator[]> {
		return this.nearService.viewer.view({
			contractId: this.contractId,
			methodName: "get_delegators_of_validator_in_era",
			args: {
				era_number: era_number?.toString(),
				validator_id
			}
		})
	}

	async get_all_validator_and_delegator_in_era(era_number?: number | undefined): Promise<ValidatorAndHisDelegators[]> {
		let validators = await this.get_validator_list_of(era_number)
		let validatorAndHisDelegators = Promise.all(
			validators
			.map(validator=> this.get_delegators_of_validator_in_era(era_number, validator.validator_id)
			.then((delegators):ValidatorAndHisDelegators => {
				return {validator_id: validator.validator_id, delegator_ids: delegators.map(e=>e.delegator_id)} 
			})))
		return validatorAndHisDelegators
	}

	withdraw_validator_rewards(validator_id: AccountId)  {
		this.nearService.viewer.signAndSendTransaction({
		})
	}

	
}
