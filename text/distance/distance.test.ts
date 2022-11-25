namespace $ {
	$mol_test({
		
		'Same text'() {
			$mol_assert_equal( $mol_text_distance( '', '' ), 0 )
			$mol_assert_equal( $mol_text_distance( 'foo', 'foo' ), 0 )
		},
		
		'Different text'() {
			$mol_assert_equal( $mol_text_distance( 'a', '' ), 1 )
			$mol_assert_equal( $mol_text_distance( 'foo', 'bar' ), 1 )
			$mol_assert_equal( $mol_text_distance( 'abcdefgh', '123' ), 1 )
		},
		
		'Add letters'() {
			$mol_assert_equal( $mol_text_distance( 'jin', 'jin1' ), .14285714285714285 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'distance1' ), .058823529411764705 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'distance1234' ), .2 )
		},
		
		'Drop letters'() {
			$mol_assert_equal( $mol_text_distance( 'jin', 'ji' ), .2 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'distanc' ), .06666666666666667 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'dist' ), .3333333333333333 )
		},
		
		'Change letters'() {
			$mol_assert_equal( $mol_text_distance( 'jiny', 'jin1' ), .25 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'distanc1' ), .125 )
			$mol_assert_equal( $mol_text_distance( 'distance', 'dist1234' ), .5 )
		},
		
		'Words shuffle'() {
			$mol_assert_equal(
				$mol_text_distance(
					`little meerkat jumps over big elephant`,
					`over little elephant jumps big meerkat`,
				),
				.18421052631578946,
			)
		},
		
		'Real different text'() {
			$mol_assert_equal(
				$mol_text_distance(
					`A structural comparison of arbitrary objects is discussed.`,
					`Application of caching for correct comparison of cyclic references is disclosed.`,
				),
				.6594202898550725,
			)
		},
		
		'Symmetry'() {
			$mol_assert_equal(
				$mol_text_distance( `booklet`, `handbook` ),
				$mol_text_distance( `handbook`, `booklet` ),
			)
		},
		
		'Triangle inequality'() {
			const A = $mol_text_distance( `metric`, `123ric` )
			const B = $mol_text_distance( `123ric`, `123456` )
			const C = $mol_text_distance( `metric`, `123456` )
			$mol_assert_ok( A + B >= C )
		},
		
	})
}
