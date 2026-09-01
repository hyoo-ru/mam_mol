namespace $ {
	
	export async function $mol_crypto_sacred_id( this: $ ) {
		
		const inited = this.$mol_dom.localStorage.getItem( '$mol_crypto_sacred_id' )
		if( inited === 'true' ) return await this.$mol_crypto_sacred_id_get()
		
		const id = await this.$mol_crypto_sacred_id_new()
		this.$mol_dom.localStorage.setItem( '$mol_crypto_sacred_id', 'true' )
		
		return id
	}
	
	export async function $mol_crypto_sacred_id_new( this: $ ) {
		
		const cred = await this.$mol_dom.navigator.credentials.create({
			
			publicKey: {
				
				rp: {
					name: "$mol_crypto_sacred_id",
				},
				
				authenticatorSelection: {
					userVerification: 'discouraged',
					residentKey: 'discouraged',
				},

				user: {
					id: new Uint8Array([0]),
					name: "",
					displayName: ""
				},

				pubKeyCredParams: [
					// { type: "public-key", alg: -7 }, // ES256
					// { type: "public-key", alg: -8 }, // Ed25519
					// { type: "public-key", alg: -257 }, // RS256
				],

				challenge: new Uint8Array().buffer,
				
			},
			
		}) as PublicKeyCredential | null
		
		console.log( cred )
		const key = new Uint8Array( cred!.rawId, 0, 16 )
		return $mol_crypto_sacred.from( key )
	}
	
	export async function $mol_crypto_sacred_id_get( this: $ ) {
		
		const cred = await this.$mol_dom.navigator.credentials.get({
			mediation: 'silent',
			publicKey: {
				userVerification: 'discouraged',
				challenge: new Uint8Array().buffer,
			},
		}) as PublicKeyCredential | null
		
		const key = new Uint8Array( cred!.rawId, 0, 16 )
		console.log( key )
		return $mol_crypto_sacred.from( key )
	}
	
}
