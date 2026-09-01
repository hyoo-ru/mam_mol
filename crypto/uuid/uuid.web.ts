namespace $ {
	export function $mol_crypto_uuid_web(this: $) {
		return this.$mol_dom_context.crypto.randomUUID()
	}

	$.$mol_crypto_uuid = $mol_crypto_uuid_web
}
