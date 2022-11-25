namespace $ {
	
	export async function $mol_crypto_secret_id( this: $ ) {
		
		const signed = this.$mol_dom_context.localStorage.getItem( '$mol_crypto_secret' )
		if( signed === '' ) return await this.$mol_crypto_secret_id_get()
		
		const id = await this.$mol_crypto_secret_id_new()
		this.$mol_dom_context.localStorage.setItem( '$mol_crypto_secret', '' )
		return id
		
	}
	
	export async function $mol_crypto_secret_id_new( this: $ ) {
		
		const cred = await this.$mol_dom_context.navigator.credentials.create({
			
			publicKey: {
				
				rp: {
					name: "$mol_crypto_id",
				},

				user: {
					id: new Uint8Array([0]),
					name: "",
					displayName: ""
				},

				pubKeyCredParams: [
					{ type: "public-key", alg: -7 },
					{ type: "public-key", alg: -257 },
				],

				challenge: new Uint8Array().buffer,
				
			},
			
		}) as PublicKeyCredential | null
		
		return $mol_crypto_secret.from( cred!.rawId )
	}
	
	export async function $mol_crypto_secret_id_get( this: $ ) {
		
		const cred = await this.$mol_dom_context.navigator.credentials.get({
			mediation: 'silent',
			publicKey: {
				userVerification: 'discouraged',
				challenge: new Uint8Array().buffer,
			},
		}) as PublicKeyCredential | null
		
		return $mol_crypto_secret.from( cred!.rawId )
	}
	
}
