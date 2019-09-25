namespace $ {

	$mol_test({

		'module'() {

			const code = $mol_tree.fromString( 'module' )

			$mol_assert_like(
				new Uint8Array( $mol_tree_wasm_compile( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 ]) ,
			)

		} ,

		'section'() {

			const code = $mol_tree.fromString( `
				module
					section
						id type
						name
						payload
			` )

			$mol_assert_like(
				new Uint8Array( $mol_tree_wasm_compile( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 , 0x1 , 0x1 , 0 ]) ,
			)

		} ,

	})

}
