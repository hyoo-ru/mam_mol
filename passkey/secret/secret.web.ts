namespace $ {

	export class $mol_passkey_secret extends $mol_object2 {

		static async make() {

			if( !this.$.$mol_dom_context.PublicKeyCredential ) {
				$mol_fail( new Error( 'WebAuthn is unavailable: HTTPS or localhost is required' ) )
			}

			const cred = await this.$.$mol_dom_context.navigator.credentials.create({
				publicKey: {
					rp: { name: '$mol_passkey_secret' },
					user: {
						id: crypto.getRandomValues( new Uint8Array( 16 ) ),
						name: 'passkey',
						displayName: 'passkey',
					},
					pubKeyCredParams: [
						{ type: 'public-key', alg: -7 },
						{ type: 'public-key', alg: -257 },
					],
					authenticatorSelection: { userVerification: 'required', residentKey: 'required' },
					challenge: crypto.getRandomValues( new Uint8Array( 32 ) ),
					extensions: { prf: {} } as AuthenticationExtensionsClientInputs,
				},
			}) as PublicKeyCredential | null

			if( !cred ) $mol_fail( new Error( 'Passkey was not created' ) )

			const ext = cred.getClientExtensionResults() as any
			if( !ext.prf?.enabled ) {
				$mol_fail( new Error( 'This device or browser does not support PRF' ) )
			}

			return new Uint8Array( cred.rawId )
		}

		static async get(
			salt: Uint8Array<ArrayBuffer>,
			id?: Uint8Array<ArrayBuffer>,
		) {

			const cred = await this.$.$mol_dom_context.navigator.credentials.get({
				publicKey: {
					allowCredentials: id ? [ { type: 'public-key', id } ] : undefined,
					userVerification: 'required',
					challenge: crypto.getRandomValues( new Uint8Array( 32 ) ),
					extensions: { prf: { eval: { first: salt } } } as AuthenticationExtensionsClientInputs,
				},
			}) as PublicKeyCredential | null

			const ext = cred?.getClientExtensionResults() as any
			const first = ext?.prf?.results?.first as ArrayBuffer | undefined

			if( !cred || !first ) {
				$mol_fail( new Error( 'Passkey not found or returned no PRF secret' ) )
			}

			return {
				id: new Uint8Array( cred.rawId ),
				key: new Uint8Array( first ),
			}
		}

	}

}