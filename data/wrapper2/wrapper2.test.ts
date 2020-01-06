namespace $ {

	$mol_test({

		'(De)Serialization' () {

			const Duration = $mol_data_pipe(
				$mol_data_variant( $mol_data_string , $mol_data_integer ) ,
				$mol_data_wrapper2( $mol_time_duration )
			)

			$mol_assert_equal( JSON.stringify( Duration( 'P1D' ) ) , '"P1DT"' )
			$mol_assert_equal( JSON.stringify( Duration( 1000 ) ) , '"PT1S"' )
	
		} ,

	})

}
