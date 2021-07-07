namespace $ {
	
	const parse_series = $mol_data_array( $mol_data_number )
	
	$mol_test({

		'Is empty array' () {
			$mol_assert_like(
				parse_series.call( $$, [] ),
				[],
			)
		} ,

		'Is array' () {
			$mol_assert_like(
				parse_series.call( $$, [ 1, 2 ] ),
				[ 1, 2 ],
			)
		} ,

		'Is not array' () {
			$mol_assert_fail( ()=> {
				parse_series.call( $$, { [0] : 1 , length : 1 , map : ()=> {} } as any as number[] )
			} , '[object Object] is not an array' )
		} ,

		'Has wrong item' () {
			$mol_assert_fail( ()=> {
				parse_series.call( $$, [ 1 , '1' as any as number ] )
			} , '[1] 1 is not a number' )
		} ,

		'Has wrong deep item' () {
			
			const parse_data = $mol_data_array( parse_series )
			
			$mol_assert_fail( ()=> {
				parse_data.call( $$, [ [] , [ 0 , 0 , false ] ] as any )
			} , '[1] [2] false is not a number' )
			
		} ,

	})

}
