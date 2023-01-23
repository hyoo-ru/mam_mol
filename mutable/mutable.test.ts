namespace $ {
	$mol_test({
		
		'Wrap & unwrap'() {
			
			const val = [1]
			const mut = $mol_mutable( val )
			
			$mol_assert_equal( val, mut() )
			
		},
		
		'Deep array'() {
			
			const val = [ [1], [2], [3] ]
			const mut = $mol_mutable( val )
			
			$mol_assert_equal( mut[1][0]( v => -v ), -2 )
			
			$mol_assert_unique( val, mut() )
			
			$mol_assert_equal( val[0], mut()[0] )
			$mol_assert_equal( val[2], mut()[2] )
			
			$mol_assert_unique( val[1], mut()[1] )
			$mol_assert_like( mut()[1], [-2] )
			
		},
		
		'Array insert'() {
			
			const val = [[ 1, 2, 3, 4 ]]
			const mut = $mol_mutable( val )
			
			$mol_assert_like(
				mut[0]( a => [ ... a.slice( 0, 2 ), 7, ... a.slice( 2 ) ] ),
				[ 1, 2, 7, 3, 4 ],
			)
			
			$mol_assert_like(
				mut(),
				[[ 1, 2, 7, 3, 4 ]],
			)
			
		},
		
		'Deep objects'() {
			
			const val = { a: { x: 1 }, b: { y: 2 }, c: { z: 3 } }
			const mut = $mol_mutable( val )
			
			$mol_assert_equal( mut.b.y( v => -v ), -2 )
			
			$mol_assert_unique( val, mut() )
			
			$mol_assert_equal( val.a, mut().a )
			$mol_assert_equal( val.c, mut().c )
			
			$mol_assert_unique( val.b, mut().b )
			$mol_assert_like( mut().b, { y: -2 } )
			
		},
		
	})
}