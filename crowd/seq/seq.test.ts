namespace $ {
	$mol_test({
		
		'Put values to end'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'bar' )
				.toJSON(),
				
				[
					[ 'foo', +1001 ],
					[ 'bar', +2001 ],
				],
				
			)
			
		},
		
		'Ignore existen values'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'foo' )
				.toJSON(),
				
				[
					[ 'foo', +2001 ],
				],
				
			)
			
		},
		
		'Put value to middle'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'bar' )
				.insert( 'xxx', 1 )
				.toJSON(),
				
				[
					[ 'foo', +1001 ],
					[ 'xxx', +3001 ],
					[ 'bar', +2001 ],
				],
				
			)
			
		},
		
		'Put value to start'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'bar', 0 )
				.toJSON(),
				
				[
					[ 'bar', +2001 ],
					[ 'foo', +1001 ],
				],
				
			)
			
		},
		
		'Partial delete values'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'bar' )
				.cut( 'foo' )
				.toJSON(),
				
				[
					[ 'bar', +2001 ],
					[ 'foo', -3001 ],
				],
				
			)
			
		},
		
		'Ignore already kicked values'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.cut( 'foo' )
				.cut( 'foo' )
				.toJSON(),
				
				[
					[ 'foo', -2001 ],
				],
				
			)
			
		},
		
		'Convert to native array'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 'foo' )
				.insert( 'bar', 0 )
				.insert( 'xxx' )
				.cut( 'foo' )
				.items,
				
				[ "bar", "xxx" ],
				
			)
			
		},
		
		'Merge different sequences'() {
			
			const left = new $mol_crowd_seq(1)
			.insert( 'foo' )
			.insert( 'bar' )
			
			const right = new $mol_crowd_seq(2)
			.insert( 'xxx' )
			.insert( 'yyy' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				[
					[ 'foo', +1001 ],
					[ 'xxx', +1002 ],
					[ 'bar', +2001 ],
					[ 'yyy', +2002 ],
				],
				
			)
			
		},
		
		'Insertion conflict'() {
			
			const base = new $mol_crowd_seq(1)
			.insert( 'foo' )
			.insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 1 )
			const right = base.fork(3).insert( 'yyy', 1 )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				[
					[ 'foo', +1001 ],
					[ 'xxx', +3002 ],
					[ 'yyy', +3003 ],
					[ 'bar', +2001 ],
				],
				
			)
			
		},
		
		'Insert before moved'() {
			
			const base = new $mol_crowd_seq(1)
			.insert( 'foo' )
			.insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 0 )
			const right = base.fork(3).insert( 'foo', 2 )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				[
					[ 'xxx', +3002 ],
					[ 'bar', +2001 ],
					[ 'foo', +3003 ],
				],
				
			)
			
		},
		
		'Insert before kicked'() {
			
			const base = new $mol_crowd_seq(1)
			.insert( 'foo' )
			.insert( 'bar' )
			
			const left = base.fork(2).insert( 'xxx', 0 )
			const right = base.fork(3).cut( 'foo' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				[
					[ 'xxx', +3002 ],
					[ 'bar', +2001 ],
					[ 'foo', -3003 ],
				],
				
			)
			
		},
		
		'Number ids support'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.insert( 1 )
				.insert( 2 )
				.insert( 3, 1 )
				.toJSON(),
				
				[
					[ 1, +1001 ],
					[ 3, +3001 ],
					[ 2, +2001 ],
				],
				
			)
			
		},
		
	})
}
