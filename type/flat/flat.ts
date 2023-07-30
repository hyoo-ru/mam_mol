namespace $ {

	/**
	 * Make flat structure from volume.
	 *
	 * 	// { fooBarWee: number; fooToo: string }
	 * 	type flat = $mol_type_flat< { foo: { bar: { wee: number }; too: string } } >
	 */
	export type $mol_type_flat< Type, Endpoint = never > =
		// @ts-ignore
		$mol_type_partial_undefined<
			{
				[
					// @ts-ignore
					FlatKeys in $mol_type_flat_keys< Type, Endpoint >
					// @ts-ignore
					as $mol_type_case_camel< FlatKeys >
				]:
					// @ts-ignore
					$mol_type_volume_value< Type, $mol_type_case_dot< FlatKeys > >
			}
		>

}
