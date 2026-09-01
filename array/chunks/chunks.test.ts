namespace $ {

	$mol_test({

		'empty array'() {
			
			$mol_assert_equal(
				$mol_array_chunks( [], ()=> true ),
				[],
			)

		},

		'one chunk'() {
			
			$mol_assert_equal(
				$mol_array_chunks( [ 1, 2, 3, 4, 5 ], ()=> false ),
				[ [ 1, 2, 3, 4, 5 ] ],
			)

		},

		'fixed size chunk'() {
			
			$mol_assert_equal(
				$mol_array_chunks( [ 1, 2, 3, 4, 5 ], 3 ),
				[ [ 1, 2, 3 ], [ 4, 5 ] ],
			)

		},

		'first empty chunk'() {
			
			$mol_assert_equal(
				$mol_array_chunks( [ 1, 2, 3, 4, 5 ], (_,i)=> i === 0 ),
				[ [ 1, 2, 3, 4, 5 ] ],
			)

		},

		'chunk for every item'() {
			
			$mol_assert_equal(
				$mol_array_chunks( [ 1, 2, 3, 4, 5 ], ()=> true ),
				[ [1], [2], [3], [4], [5] ],
			)

		},

	})

}
