namespace $ {
	export async function $mol_crypto_sacred_shared(
		priv: $mol_crypto_key_private,
		pub: $mol_crypto_key_public,
	) {
			
		return $mol_crypto_sacred.from( new Uint8Array( 
			await $mol_crypto_native.subtle.deriveBits(
				{
					name: "ECDH",
					public: await pub.native_derive(),
				},
				await priv.native_derive(),
				$mol_crypto_sacred.size * 8,
			).catch( $mol_crypto_restack )
		) )
		
	}

}
