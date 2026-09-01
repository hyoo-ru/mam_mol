namespace $ {

	$mol_test({

		'config by value'() {

			const N = $mol_data_setup( ( a : number )=> a , 5 )
			
			$mol_assert_equal( N.config , 5 )
			
			type record_value = $mol_type_assert<
				typeof N.Value ,
				number
			>
			
		} ,

	})

}
