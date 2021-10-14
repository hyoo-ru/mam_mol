namespace $ {
	
	export async function $mol_crypto_secret_id( this: $ ) {
		try {
			return await this.$mol_crypto_secret_id_get()
		} catch {
			return await this.$mol_crypto_secret_id_new()
		}
	}
	
	export async function $mol_crypto_secret_id_new( this: $ ) {
		
		const cred = await this.$mol_dom_context.navigator.credentials.create({
			
			publicKey: {
				
				rp: {
					name: "$mol_crypto_id"
				},

				user: {
					id: new Uint8Array(16),
					name: "",
					displayName: ""
				},

				pubKeyCredParams: [
					{ type: "public-key", alg: -257 },
				],


				timeout: 1000,

				challenge: new Uint8Array().buffer,
				
			},
			
		}) as PublicKeyCredential | null
		
		return $mol_crypto_secret.from( cred!.rawId )
	}
	
	export async function $mol_crypto_secret_id_get( this: $ ) {
		
		const cred = await this.$mol_dom_context.navigator.credentials.get({
            publicKey: {
                timeout: 1000,
                challenge: new Uint8Array().buffer
            },
        }) as PublicKeyCredential | null
		
		return $mol_crypto_secret.from( cred!.rawId )
	}
	
}
