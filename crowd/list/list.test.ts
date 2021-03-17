namespace $ {
	$mol_test({
		
		'Put values to end'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 'bar' ],
					[ +1001, +2001 ],
				),
			)
			
		},
		
		'Ignore existen values'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'foo' ).toJSON(),
				$mol_crowd_delta(
					[ 'foo' ],
					[ +2001 ],
				),
			)
			
		},
		
		'Slice after version'() {
			
			const store = new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' )

			$mol_assert_like( store.toJSON( +1001 ), $mol_crowd_delta(
				[ 'foo', 'bar' ],
				[ +1001, +2001 ],
			) )
			
			$mol_assert_like( store.toJSON( +2001 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Put value to the middle'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' ).insert( 'xxx', 1 ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 'xxx', 'bar' ],
					[ +1001, +3001, +2001 ],
				),
			)
			
		},
		
		'Put value to the start'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar', 0 ).toJSON(),
				$mol_crowd_delta(
					[ 'bar', 'foo' ],
					[ +2001, +1001 ],
				),
			)
			
		},
		
		'Partial cut values'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' ).cut( 'foo' ).toJSON(),
				$mol_crowd_delta(
					[ 'bar', 'foo' ],
					[ +2001, -3001 ],
				),
			)
			
		},
		
		'Ignore already cutted values'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 'foo' ).cut( 'foo' ).cut( 'foo' ).toJSON(),
				$mol_crowd_delta(
					[ 'foo' ],
					[ -2001 ],
				),
			)
			
		},
		
		'Convert to native array'() {
			
			const store = new $mol_crowd_list().fork(1)
			.insert( 'foo' )
			.insert( 'bar', 0 )
			.insert( 'xxx' )
			.cut( 'foo' )
			
			$mol_assert_like( store.items, [ "bar", "xxx" ] )
			
		},
		
		'Merge different sequences'() {
			
			const left = new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' )
			const right = new $mol_crowd_list().fork(2).insert( 'xxx' ).insert( 'yyy' )
			
			const left_delta = left.toJSON()
			const right_delta = right.toJSON()
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'xxx', 'yyy', 'foo', 'bar' ],
					[ +1002, +2002, +1001, +2001 ],
				),
			)
			
		},
		
		'Insert in the same place'() {
			
			const base = new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 1 )
			const right = base.fork(3).insert( 'yyy', 1 )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 'yyy', 'xxx', 'bar' ],
					[ +1001, +3003, +3002, +2001 ],
				),
			)
			
		},
		
		'Insert after moved'() {
			
			const base = new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 1 )
			const right = base.fork(3).insert( 'foo', 2 )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'xxx', 'bar', 'foo' ],
					[ +3002, +2001, +3003 ],
				),
			)
			
		},
		
		'Insert after cutted'() {
			
			const base = new $mol_crowd_list().fork(1).insert( 'foo' ).insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 1 )
			const right = base.fork(3).cut( 'foo' )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'xxx', 'bar', 'foo' ],
					[ +3002, +2001, -3003 ],
				),
			)
			
		},
		
		'Number ids support'() {
			
			$mol_assert_like(
				new $mol_crowd_list().fork(1).insert( 1 ).insert( 2 ).insert( 3, 1 ).toJSON(),
				$mol_crowd_delta(
					[ 1, 3, 2 ],
					[ +1001, +3001, +2001 ],
				),
			)
			
		},
		
	})
}
