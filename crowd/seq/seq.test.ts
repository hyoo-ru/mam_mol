namespace $ {
	$mol_test({
		
		'Put values to end'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.bring( 'foo' )
				.bring( 'bar' )
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
				.bring( 'foo' )
				.bring( 'foo' )
				.toJSON(),
				
				[
					[ 'foo', +2001 ],
				],
				
			)
			
		},
		
		'Put value to middle'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.bring( 'foo' )
				.bring( 'bar' )
				.bring( 'xxx', 1 )
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
				.bring( 'foo' )
				.bring( 'bar', 0 )
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
				.bring( 'foo' )
				.bring( 'bar' )
				.kick( 'foo' )
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
				.bring( 'foo' )
				.kick( 'foo' )
				.kick( 'foo' )
				.toJSON(),
				
				[
					[ 'foo', -2001 ],
				],
				
			)
			
		},
		
		'Convert to native array'() {
			
			$mol_assert_like(
				
				new $mol_crowd_seq(1)
				.bring( 'foo' )
				.bring( 'bar', 0 )
				.bring( 'xxx' )
				.kick( 'foo' )
				.items,
				
				[ "bar", "xxx" ],
				
			)
			
		},
		
		'Merge different sequences'() {
			
			const left = new $mol_crowd_seq(1)
			.bring( 'foo' )
			.bring( 'bar' )
			
			const right = new $mol_crowd_seq(2)
			.bring( 'xxx' )
			.bring( 'yyy' )
			
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
			.bring( 'foo' )
			.bring( 'bar' )
			
			const left = base.fork(2).bring( 'xxx', 1 )
			const right = base.fork(3).bring( 'yyy', 1 )
			
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
			.bring( 'foo' )
			.bring( 'bar' )
			
			const left = base.fork(2).bring( 'xxx', 0 )
			const right = base.fork(3).bring( 'foo', 2 )
			
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
			.bring( 'foo' )
			.bring( 'bar' )
			
			const left = base.fork(2).bring( 'xxx', 0 )
			const right = base.fork(3).kick( 'foo' )
			
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
				.bring( 1 )
				.bring( 2 )
				.bring( 3, 1 )
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
