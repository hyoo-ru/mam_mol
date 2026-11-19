namespace $ {
	$mol_test({
		async 'storage level'() {
			// prevent async in tests
			await $mol_wire_async( $mol_storage ).level()
		}
	})
}
