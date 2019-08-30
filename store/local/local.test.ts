namespace $ {

	$mol_test({

		'get/set/delete' () {
			
			var key = '$mol_store_local_test'
			$mol_assert_equal( $mol_store_local.value( key ) , null )
			
			$mol_store_local.value( key , 123 )
			$mol_assert_equal( $mol_store_local.value( key ) , 123 )
			
			$mol_store_local.value( key , null )
			$mol_assert_equal( $mol_store_local.value( key ) , null )

		} ,

		'mocked' ( $ ) {

			var key = '$mol_store_local_test'
			$.$mol_store_local.value( key , 321 )

			$mol_assert_unique( $mol_store_local.value( key ) , 321 )
			
		} ,

	})

}
