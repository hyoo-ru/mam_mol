namespace $ {
	$mol_test({
		
		'Default state'() {
			
			const val = new $mol_crowd_numb()
			
			$mol_assert_like( val.toJSON(), $mol_crowd_delta([],[]) )
			$mol_assert_like( val.value, 0 )
			
		},
		
		'Serial changes'() {
			
			const store = new $mol_crowd_numb().fork(1).shift( +5 ).shift( -3 )
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta(
				[ +2 ],
				[ +2001 ],
			) )
			
			$mol_assert_like( store.value, 2 )
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_numb()
			.fork(1).shift( +5 ).shift( -3 )
			.fork(2).shift( -2 )

			$mol_assert_like( val.toJSON( +1001 ), $mol_crowd_delta(
				[ +2, -2 ],
				[ +2001, +3002 ],
			) )
			
			$mol_assert_like( val.toJSON( +2001 ), $mol_crowd_delta(
				[ -2 ],
				[ +3002 ],
			 ) )
			
			$mol_assert_like( val.toJSON( +3002 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Concurrent changes'() {
			
			const base = new $mol_crowd_numb().fork(1).shift( +5 )
			
			const left = base.fork(2).shift( +3 ).shift( +1 )
			const right = base.fork(3).shift( -2 ).shift( +1 )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			left.apply( right_delta )
			right.apply( left_delta )
			
			$mol_assert_like(
				left.value,
				right.value,
				8,
			)
			
		},
		
	})
}
