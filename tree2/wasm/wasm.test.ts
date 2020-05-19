namespace $ {

	$mol_test({

		'module'() {

			const code = $mol_tree2.fromString( 'wasm.module' )

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 ]) ,
			)

		} ,

		'section'() {

			const code = $mol_tree2.fromString( `
				wasm.module
					wasm.section
						wasm.id wasm.type
						wasm.name
						wasm.payload
			` )

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 , 0x1 , 0x1 , 0 ]) ,
			)

		} ,

	})

}
