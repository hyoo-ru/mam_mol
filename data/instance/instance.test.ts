namespace $ {
	
	const parse_date = $mol_data_instance( Date )
	const parse_object = $mol_data_instance( Object )
	
	$mol_test({

		'Is same class' () {
			parse_date.call( $$, new Date )
		} ,

		'Is sub class' () {
			parse_object.call( $$, new Date )
		} ,

		'Is super class' () {
			$mol_assert_fail( ()=> {
				parse_date.call( $$, new Object as any )
			} , '[object Object] is not a Date' )
		} ,

		'Is another class' () {
			$mol_assert_fail( ()=> {
				parse_date.call( $$, new Array as any )
			} , ' is not a Date' )
		} ,

		'Is not object' () {
			$mol_assert_fail( ()=> {
				parse_date.call( $$, null as any )
			} , 'null is not a Date' )
		} ,

	})
	
}
