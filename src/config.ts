
export function getConfig() {
	return {
		near: {
			networkId: "mainnet",
			nodeUrl: "https://rpc.mainnet.near.org"
		},
		autoctopus: {
			contractId: "autoctopus",
			privateKey: requiredEnv("OPERATOR_PRIVATE_KEY")
		},
		octopus: {
			registryContractId: "",
		}
	}
}

export function requiredEnv(key: string): string {
	const env = optionalEnv(key);
	if (!env) {
	  console.error(`Missing env: ${key}`);
	  process.exit(1);
	}
	return env;
}

export function optionalEnv(key: string): string | undefined {
	return process.env[key];
}