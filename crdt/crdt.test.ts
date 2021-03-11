namespace $ {
	$mol_test({
		
		'Put values to end'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'bar' )
				.toJSON(),
				
				{
					foo: +100001,
					bar: +200001,
				},
				
			)
			
		},
		
		'Ignore existen values'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'foo' )
				.toJSON(),
				
				{
					foo: +200001,
				},
				
			)
			
		},
		
		'Put value to middle'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'bar' )
				.put( 'xxx', 1 )
				.toJSON(),
				
				{
					foo: +100001,
					xxx: +300001,
					bar: +200001,
				},
				
			)
			
		},
		
		'Put value to start'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'bar', 0 )
				.toJSON(),
				
				{
					bar: +200001,
					foo: +100001
				},
				
			)
			
		},
		
		'Partial delete values'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'bar' )
				.kick( 'foo' )
				.toJSON(),
				
				{
					bar: +200001,
					foo: -300001,
				},
				
			)
			
		},
		
		'Ignore already kicked values'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.kick( 'foo' )
				.kick( 'foo' )
				.toJSON(),
				
				{
					foo: -200001
				},
				
			)
			
		},
		
		'Convert to native array'() {
			
			$mol_assert_like(
				
				new $mol_crdt_seq( 1 )
				.put( 'foo' )
				.put( 'bar', 0 )
				.put( 'xxx' )
				.kick( 'foo' )
				.items,
				
				[ "bar", "xxx" ],
				
			)
			
		},
		
		'Merge different sets'() {
			
			const left = new $mol_crdt_seq( 1 )
			.put( 'foo' )
			.put( 'bar' )
			
			const right = new $mol_crdt_seq( 2 )
			.put( 'xxx' )
			.put( 'yyy' )
			
			const left_event = left.fork()
			const right_event = right.fork()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				{
					foo: +100001,
					xxx: +100002,
					bar: +200001,
					yyy: +200002,
				},
				
			)
			
		},
		
		'Insertion conflict'() {
			
			const base = new $mol_crdt_seq( 1 )
			.put( 'foo' )
			.put( 'bar' )
			
			const left = base.fork( 2 ).put( 'xxx', 1 )
			const right = base.fork( 3 ).put( 'yyy', 1 )
			
			const left_event = left.fork()
			const right_event = right.fork()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				{
					foo: +100001,
					xxx: +300002,
					yyy: +300003,
					bar: +200001,
				},
				
			)
			
		},
		
		'Insert before moved'() {
			
			const base = new $mol_crdt_seq( 1 )
			.put( 'foo' )
			.put( 'bar' )
			
			const left = base.fork( 2 ).put( 'xxx', 0 )
			const right = base.fork( 3 ).put( 'foo', 2 )
			
			const left_event = left.fork()
			const right_event = right.fork()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				{
					xxx: +300002,
					bar: +200001,
					foo: +300003,
				},
				
			)
			
		},
		
		'Insert before kicked'() {
			
			const base = new $mol_crdt_seq( 1 )
			.put( 'foo' )
			.put( 'bar' )
			
			const left = base.fork( 2 ).put( 'xxx', 0 )
			const right = base.fork( 3 ).kick( 'foo' )
			
			const left_event = left.fork()
			const right_event = right.fork()
			
			$mol_assert_like(
				
				left
				.merge( right_event )
				.toJSON(),
				
				right
				.merge( left_event )
				.toJSON(),
				
				{
					xxx: +300002,
					bar: +200001,
					foo: -300003,
				},
				
			)
			
		},
		
	})
}
