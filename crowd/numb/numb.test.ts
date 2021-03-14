namespace $ {
	$mol_test({
		
		'Default state'() {
			
			const val = new $mol_crowd_numb()
			
			$mol_assert_like( val.toJSON(), [] )
			$mol_assert_like( val.value, 0 )
			
		},
		
		'Serial changes'() {
			
			const store = new $mol_crowd_numb().fork(1).shift( +5 ).shift( -3 )
			
			$mol_assert_like( store.toJSON(), [
				[ +2, +2001 ],
			] )
			
			$mol_assert_like( store.value, 2 )
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_numb()
			.fork(1).shift( +5 ).shift( -3 )
			.fork(2).shift( -2 )

			$mol_assert_like( val.toJSON( +1001 ), [
				[ +2, +2001 ],
				[ -2, +3002 ],
			] )
			
			$mol_assert_like( val.toJSON( +2001 ), [
				[ -2, +3002 ],
			] )
			
			$mol_assert_like( val.toJSON( +3002 ), [] )
			
		},
		
		'Concurrent changes'() {
			
			const base = new $mol_crowd_numb().fork(1).shift( +5 )
			
			const left = base.fork(2).shift( +3 ).shift( +1 )
			const right = base.fork(3).shift( -2 ).shift( +1 )
			
			const left_event = left.delta( base )
			const right_event = right.delta( base )
			
			left.apply( right_event )
			right.apply( left_event )
			
			$mol_assert_like(
				left.toJSON(),
				right.toJSON(),
				[
					[ +5, +1001 ],
					[ +4, +3002 ],
					[ -1, +3003 ],
				]
			)
			
			$mol_assert_like(
				left.value,
				right.value,
				8,
			)
			
		},
		
	})
}
