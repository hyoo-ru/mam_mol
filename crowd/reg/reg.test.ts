namespace $ {
	$mol_test({
		
		'Default state'() {
			
			$mol_assert_like(
				new $mol_crowd_reg(1).toJSON(),
				[ null, 0 ],
			)
			
		},
		
		'Serial changes'() {
			
			$mol_assert_like(
				
				new $mol_crowd_reg(1)
				.set( 'foo' )
				.set( 'bar' )
				.toJSON(),
				
				[ 'bar', +2001 ],
				
			)
			
		},
		
		'Conflicted changes'() {
			
			const base = new $mol_crowd_reg(1).set( 'foo' )
			
			const left = base.fork(2).set( 'bar' )
			const right = base.fork(3).set( 'xxx' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				left.merge( right_event ).toJSON(),
				right.merge( left_event ).toJSON(),
				[ 'xxx', +2003 ],
			)
			
		},
		
	})
}
