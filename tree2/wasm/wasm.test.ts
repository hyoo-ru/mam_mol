namespace $ {

	$mol_test({

		'module'($) {

			const code = $.$mol_tree2_from_string(``)

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 ]) ,
			)

		} ,

		'custom section'($) {

			const code = $.$mol_tree2_from_string(`
				custom xxx
			`)

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 , 0 , 0x4 , 0x3, 0x78, 0x78, 0x78 ]) ,
			)

		} ,

		'type section with value types'($) {

			const code = $.$mol_tree2_from_string(`
				type xxx
					=> i32
					=> i64
					=> f32
					<= f64
			`)

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0, 0x01, 0x08, 0x01, 0x60, 0x03, 0x7f, 0x7e, 0x7d, 0x01, 0x7c ]) ,
			)

		} ,

		'import section'($) {

			const code = $.$mol_tree2_from_string(`
				type xxx
				import foo.bar func xxx
			`)

			$mol_assert_like(
				new Uint8Array( $mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([
					0, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0, 
					0x01, 0x04, 0x01, 0x60, 0, 0,
					0x02, 0x0b, 0x01, 0x03, 0x66, 0x6f, 0x6f, 0x03, 0x62, 0x61, 0x72, 0, 0
				]) ,
			)

		} ,

	})

}
