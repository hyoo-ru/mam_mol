namespace $ {
	$mol_test({

		'Closed number range' () {
			
			const Pos = $mol_data_range( 0, 1 )
			
			Pos( Number.EPSILON )
			
			$mol_assert_fail( ()=> Pos( 1 ), '1 is out range (0,1)' )
			$mol_assert_fail( ()=> Pos( 0 ), '0 is out range (0,1)' )
			$mol_assert_fail( ()=> Pos( Number.POSITIVE_INFINITY ), 'Infinity is out range (0,1)' )
			$mol_assert_fail( ()=> Pos( Number.NEGATIVE_INFINITY ), '-Infinity is out range (0,1)' )
			$mol_assert_fail( ()=> Pos( NaN ), 'NaN is out range (0,1)' )
			
		} ,

		'Open number range' () {
			
			const Pos = $mol_data_range( 0, Number.POSITIVE_INFINITY )
			
			Pos( Number.EPSILON )
			Pos( Number.MAX_VALUE )
			
			$mol_assert_fail( ()=> Pos( 0 ), '0 is out range (0,Infinity)' )
			$mol_assert_fail( ()=> Pos( Number.POSITIVE_INFINITY ), 'Infinity is out range (0,Infinity)' )
			$mol_assert_fail( ()=> Pos( Number.NEGATIVE_INFINITY ), '-Infinity is out range (0,Infinity)' )
			$mol_assert_fail( ()=> Pos( NaN ), 'NaN is out range (0,Infinity)' )
			
		} ,

		'String range' () {
			
			const Code = $mol_data_range( 'A', 'B' )
			
			Code( 'Aa' )
			Code( 'AZ' )
			
			$mol_assert_fail( ()=> Code( 'A' ), 'A is out range (A,B)' )
			$mol_assert_fail( ()=> Code( 'B' ), 'B is out range (A,B)' )
			
		} ,

	})
}
