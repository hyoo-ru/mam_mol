namespace $ {
	export function $mol_crypto_uuid_node(this: $) {
		return this.$node.crypto.randomUUID()
	}

	$.$mol_crypto_uuid = $mol_crypto_uuid_node
}
