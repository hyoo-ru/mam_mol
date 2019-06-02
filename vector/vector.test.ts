namespace $ {
	$mol_test({

		'Limit'() {

			let point = new $mol_vector_3d( 7 , 10 , 13 )
			const res = point.limited( [ 1 , 5 ] , [ 15 , 20 ] , [ 5 , 10 ] )

			$mol_assert_equal( res.x , 5 )
			$mol_assert_equal( res.y , 15 )
			$mol_assert_equal( res.z , 10 )

		} ,

		'Add'() {

			let point = new $mol_vector_3d( 1 , 2 , 3 )
			let res = point.added( 5 , 10 , 15 )

			$mol_assert_equal( res.x , 6 )
			$mol_assert_equal( res.y , 12 )
			$mol_assert_equal( res.z , 18 )

		} ,

		'Mult'() {

			let point = new $mol_vector_3d( 2 , 3 , 4 )
			let res = point.multed( 5 , 2 , -2 )

			$mol_assert_equal( res.x , 10 )
			$mol_assert_equal( res.y , 6 )
			$mol_assert_equal( res.z , -8 )

		} ,

	})
}
