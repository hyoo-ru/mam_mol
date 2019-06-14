namespace $ {
	$mol_test({

		'Is same class' () {
			$mol_data_instance( Date )( new Date )
		} ,

		'Is sub class' () {
			$mol_data_instance( Object )( new Date )
		} ,

		'Is super class' () {
			$mol_assert_fail( ()=> {
				$mol_data_instance( Date )( new Object as any )
			} , 'is not a Date' )
		} ,

		'Is another class' () {
			$mol_assert_fail( ()=> {
				$mol_data_instance( Date )( new Array as any )
			} , 'is not a Date' )
		} ,

		'Is not object' () {
			$mol_assert_fail( ()=> {
				$mol_data_instance( Date )( null as any )
			} , 'is not a Date' )
		} ,

	})
}
