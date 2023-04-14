import { HttpFunction } from "@google-cloud/functions-framework/build/src/functions";
import { RegistryContract } from "./octopus/registry";
import { getConfig } from "./config";
import { initNearService } from "./near";
import { AnchorContract } from "./octopus/anchor";
import { AccountId } from "./types";

const helloWorld: HttpFunction = async (req, res) => {

  let nearService = await initNearService()

  let registryContract = new RegistryContract(getConfig().octopus.registryContractId, nearService )
  let appchain_ids = await registryContract.get_appchain_ids()
  let appchain_anchor = appchain_ids.map(appchain_id=> new AnchorContract(registryContract.get_appchain_contract_id(appchain_id),nearService))
};


async function claimRewardsInAnchor(appchain_anchor: AnchorContract, should_help_claim: (accountId: AccountId)=>boolean ): void {
  let validatorAndHisDelegators = await appchain_anchor.get_all_validator_and_delegator_in_era()
  validatorAndHisDelegators.forEach(validatorAndHisDelegator=> {
    validatorAndHisDelegator.validator_id
    appchain_anchor.withdraw_validator_rewards

  })

  

}


export { helloWorld };
