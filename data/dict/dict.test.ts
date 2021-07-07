namespace $ {
	
	const parse_stat = $mol_data_dict( $mol_data_number )
	
	$mol_test({

		'Is empty dict' () {
			$mol_assert_like( parse_stat.call( $$, {} ), {} )
		} ,

		'Is dict' () {
			$mol_assert_like( parse_stat.call( $$, { foo: 123 } ), { foo: 123 } )
		} ,

		'Is not dict' () {
			$mol_assert_fail( ()=> {
				parse_stat.call( $$, [ 123 ] )
			} , '123 is not an Object' )
		} ,

		'Has wrong item' () {
			$mol_assert_fail( ()=> {
				parse_stat.call( $$, { foo : 1 , bar : '1' as any as number } )
			} , '["bar"] 1 is not a number' )
		} ,

		'Has wrong deep item' () {
			$mol_assert_fail( ()=> {
				$mol_data_dict( parse_stat ).call( $$, { foo : { bar : false as any as number } } )
			} , '["foo"] ["bar"] false is not a number' )
		} ,

	})
	
}
