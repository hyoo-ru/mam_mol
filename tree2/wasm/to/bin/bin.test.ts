namespace $ {

	$mol_test({

		'module'($) {

			const code = $.$mol_tree2_from_string(``)

			$mol_assert_like(
				new Uint8Array( $.$mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 ]) ,
			)

		} ,

		'custom section'($) {

			const code = $.$mol_tree2_from_string(`
				custom xxx
			`)

			$mol_assert_like(
				new Uint8Array( $.$mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([
					0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 , 0 ,
					0x4 , 0x3, 0x78, 0x78, 0x78
				]) ,
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
				new Uint8Array( $.$mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([
					0, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0,
					0x01, 0x08, 0x01, 0x60, 0x03, 0x7f, 0x7e, 0x7d, 0x01, 0x7c
				]) ,
			)

		} ,

		'import section'($) {

			const code = $.$mol_tree2_from_string(`
				type nothing
				import foo.bar func nothing
			`)

			$mol_assert_like(
				new Uint8Array( $.$mol_tree2_wasm_to_module( code ).buffer ) ,
				new Uint8Array([
					0, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0, 
					0x01, 0x04, 0x01, 0x60, 0, 0,
					0x02, 0x0b, 0x01, 0x03, 0x66, 0x6f, 0x6f, 0x03, 0x62, 0x61, 0x72, 0, 0
				]) ,
			)

		} ,

		'export imported identity'($) {

			const code = $.$mol_tree2_from_string(`
				type identity
					=> i32
					<= i32
				import foo.bar func identity
				export xxx.yyy func identity
			`)
			
			const instance = $.$mol_tree2_wasm_to_module( code ).instance({ foo: { bar: ( a: number )=> a } })
			const identity = instance.get( 'xxx.yyy' ) as ( val: number )=> number
			
			$mol_assert_like( identity( 123 ), 123 )

		} ,

		'export internal identity'($) {

			const code = $.$mol_tree2_from_string(`
				type identity
					=> i32
					<= i32
				func identity local.get 0
				export id func identity
			`)
			
			const instance = $.$mol_tree2_wasm_to_module( code ).instance()
			const identity = instance.get( 'id' ) as ( val: number )=> number
			
			$mol_assert_like( identity( 123 ), 123 )

		} ,

		'export increase'($) {

			const code = $.$mol_tree2_from_string(`
				type inc32
					=> i32
					<= i32
				func inc32
					local.get 0
					i32.const 1
					i32.add
				export increase func inc32
			`)
			
			const instance = $.$mol_tree2_wasm_to_module( code ).instance()
			const inc = instance.get( 'increase' ) as ( a: number )=> number
			
			$mol_assert_like( inc( 2 ), 3 )

		} ,

		'export function that returns pair'($) {

			const code = $.$mol_tree2_from_string(`
				type pair
					<= i32
					<= i32
				func pair
					i32.const 1
					i32.const 2
				export pair func pair
			`)
			
			const instance = $.$mol_tree2_wasm_to_module( code ).instance()
			const pair = instance.get( 'pair' ) as ()=> [ number, number ]
			
			$mol_assert_like( pair(), [ 1, 2 ] )

		} ,

	})

}
