import { AccountId, U128, U64 } from "../types"

export type AppchainId = String

export type ValidatorAndHisDelegators = {
	validator_id: AccountId,
	delegator_ids: AccountId[]
}

export type ValidatorAndDelegators = {


}

export type AppchainValidator = {
	validator_id: AccountId,
	validator_id_in_appchain: AccountId,
	deposit_amount: U128,
	total_stake: U128,
	delegators_count: U64,
	can_be_delegated_to: boolean,
	is_unbonding: boolean,
}

export type AppchainDelegator = {
	delegator_id: AccountId,
	validator_id: AccountId,
	delegation_amount: U128,
}