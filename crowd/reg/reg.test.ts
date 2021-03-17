namespace $ {
	$mol_test({
		
		'Default state'() {
			
			const store = new $mol_crowd_reg()
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta([],[]) )
			$mol_assert_like( store.value, null )
			$mol_assert_like( store.version, 0 )
			
		},
		
		'Serial changes'() {
			
			const store = new $mol_crowd_reg().fork(1)
			store.str = 'foo'
			store.str = 'bar'
			
			$mol_assert_like(
				store.toJSON(),
				$mol_crowd_delta(
					[ 'bar' ],
					[ +2001 ],
				)
			)
			
		},
		
		'Ignore same changes'() {
			
			const store = new $mol_crowd_reg().fork(1)
			store.str = 'foo'
			store.str = 'foo'
			
			$mol_assert_like(
				store.toJSON(),
				$mol_crowd_delta(
					[ 'foo' ],
					[ +1001 ],
				)
			)
			
		},
		
		'Slice after version'() {
			
			const store = new $mol_crowd_reg().fork(1)
			store.str = 'foo'
			store.str = 'bar'

			$mol_assert_like(
				store.toJSON( +1001 ),
				$mol_crowd_delta(
					[ 'bar' ],
					[ +2001 ],
				)
			)
			
			$mol_assert_like( store.toJSON( +2001 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Cuncurrent changes'() {
			
			const base = new $mol_crowd_reg().fork(1)
			base.str = 'foo'
			
			const left = base.fork(2)
			left.str = 'bar'
			
			const right = base.fork(3)
			right.str = 'xxx'
			
			const left_event = left.delta( base )
			const right_event = right.delta( base )
			
			$mol_assert_like(
				left.apply( right_event ).toJSON(),
				right.apply( left_event ).toJSON(),
				{
					values: [ 'xxx' ],
					stamps: [ +2003 ],
				},
			)
			
		},
		
	})
}
