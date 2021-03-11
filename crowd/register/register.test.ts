namespace $ {
	$mol_test({
		
		'Serial changes'() {
			
			$mol_assert_like(
				
				new $mol_crowd_register<string>( 1, '' )
				.put( 'foo' )
				.put( 'bar' )
				.toJSON(),
				
				[ 'bar', +200001 ],
				
			)
			
		},
		
		'Conflicted changes'() {
			
			const base = new $mol_crowd_register<string>( 1, '' ).put( 'foo' )
			
			const left = base.fork( 2 ).put( 'bar' )
			const right = base.fork( 3 ).put( 'xxx' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				left.merge( right_event ).toJSON(),
				right.merge( left_event ).toJSON(),
				[ 'xxx', +200003 ],
			)
			
		},
		
	})
}
