namespace $ {
	$mol_test({
		
		'Default state'() {
			
			const store = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
			}).make()
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta([],[]) )
			$mol_assert_like( store.type, null )
			$mol_assert_like( store.as( 'counter' ), null )
			$mol_assert_like( store.as( 'string' ), null )
			
		},
		
		'Change type with default value'() {
			
			const store = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
				object: $mol_crowd_set,
				array: $mol_crowd_list,
			}).make()
			
			store.to( 'counter' )
			
			$mol_assert_like( store.type, 'counter' )
			$mol_assert_like( store.as( 'counter' )!.value, 0 )
			
		},
		
		'Change value'() {
			
			const store = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
				object: $mol_crowd_set,
				array: $mol_crowd_list,
			}).make().fork(1)
			
			store.to( 'counter' )!.shift( +5 ).shift( -2 )
						
			$mol_assert_like( store.toJSON(), $mol_crowd_delta(
				[ 'counter', +3 ],
				[ +1001, +3001 ],
			) )
			
		},
		
		'Slice after version'() {
			
			const store = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
				object: $mol_crowd_set,
				array: $mol_crowd_list,
			}).make().fork(1)
			
			store.to( 'object' ).add( 'foo' ).add( 'bar' )
						
			$mol_assert_like( store.toJSON( +2001 ), $mol_crowd_delta(
				[ 'object', 'bar' ],
				[ +1001, +3001 ],
			) )
			
			$mol_assert_like( store.toJSON( +3001 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Reinterpret list as reg'() {
			
			const store = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
				object: $mol_crowd_set,
				array: $mol_crowd_list,
			}).make().fork(1)
			
			store.to( 'string' ).str = 'foo'
			store.to( 'string' ).str = 'bar'
			$mol_assert_like( store.to( 'array' ).items, [ 'bar' ] )
			
			store.as( 'array' )!.insert( 'xxx' )
			$mol_assert_like( store.to( 'string' ).str, 'xxx' )
			
		},
		
		'Cross merge list and register'() {
			
			const base = $mol_crowd_union.of({
				counter: $mol_crowd_numb,
				string: $mol_crowd_reg,
				object: $mol_crowd_set,
				array: $mol_crowd_list,
			}).make().fork(1)
			
			base.to( 'string' ).str = 'foo'
			
			const left = base.fork(2)
			left.as( 'string' )!.str = 'bar'
			
			const right = base.fork(3)
			right.to( 'array' ).insert( 'xxx' )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			$mol_assert_like(
				
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				
				$mol_crowd_delta(
					[ 'array', 'bar', 'foo', 'xxx' ],
					[ +3003, +3002, +2001, +4003 ],
				),
				
			)
			
		},
		
	})
}
