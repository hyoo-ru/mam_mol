namespace $ {

	$mol_test({

		// @todo enable on strict
		// 'no functions'() {
			
		// 	const stringify = $mol_data_pipe()
			
		// 	type Type = $mol_type_assert<
		// 		typeof stringify,
		// 		( input : never )=> never
		// 	>
	
		// },

		'single function'() {
			
			const stringify = $mol_data_pipe(
				( input : number )=> input.toString() ,
			)
			
			$mol_assert_equal( stringify( 5 ) , '5' )
			
		},

		'two functions'() {

			const isLong = $mol_data_pipe(
				( input : number )=> input.toString() ,
				( input : string )=> input.length > 2  ,
			)
			
			$mol_assert_equal( isLong( 5.0 ) , false )
			$mol_assert_equal( isLong( 5.1 ) , true )
			
		},

		'three functions'() {

			const pattern = $mol_data_pipe(
				( input : number )=> input.toString() ,
				( input : string )=> new RegExp( input )  ,
				( input : RegExp )=> input.toString()  ,
			)
			
			$mol_assert_equal( pattern( 5 ) , '/5/' )
			
		},

		'classes'() {

			class Box {
				constructor( public value : string ) {}
			}

			const boxify = $mol_data_pipe(
				( input : number )=> input.toString() ,
				Box
			)
			
			$mol_assert_like( boxify( 5 ) , new Box( '5' ) )
			
		},

	})

}
