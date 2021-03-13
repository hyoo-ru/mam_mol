namespace $ {
	$mol_test({
		
		'Add keys'() {
			
			$mol_assert_like(
				new $mol_crowd_set().fork(1).add( 'foo' ).add( 'bar' ).toJSON(),
				[
					[ 'foo', +1001 ],
					[ 'bar', +2001 ],
				],
			)
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_set().fork(1).add( 'foo' ).add( 'bar' )
			
			$mol_assert_like( val.toJSON( +1001 ), [
				[ 'bar', +2001 ],
			] )
			
			$mol_assert_like( val.toJSON( +2001 ), [] )
			
		},
		
		'Ignore existen keys'() {
			
			$mol_assert_like(
				new $mol_crowd_set().fork(1).add( 'foo' ).add( 'foo' ).toJSON(),
				[
					[ 'foo', +2001 ],
				],
			)
			
		},
		
		'Partial removed keys'() {
			
			$mol_assert_like(
				new $mol_crowd_set().fork(1).add( 'foo' ).add( 'bar' ).remove( 'foo' ).toJSON(),
				[
					[ 'bar', +2001 ],
					[ 'foo', -3001 ],
				],
			)
			
		},
		
		'Ignore already removed keys'() {
			
			$mol_assert_like(
				new $mol_crowd_set().fork(1).add( 'foo' ).remove( 'foo' ).remove( 'foo' ).toJSON(),
				[
					[ 'foo', -3001 ],
				],
			)
			
		},
		
		'Convert to native Set'() {
			
			$mol_assert_like(
				[ ... new $mol_crowd_set().fork(1).add( 'foo' ).add( 'xxx' ).remove( 'foo' ).items ],
				[ "xxx" ],
			)
			
		},
		
		'Merge different sets'() {
			
			const base = new $mol_crowd_set().fork(1)
			
			const left = base.fork(2).add( 'foo' ).add( 'bar' )
			const right = base.fork(3).add( 'xxx' ).add( 'yyy' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				left.merge( right_event ).toJSON(),
				right.merge( left_event ).toJSON(),
				[
					[ 'foo', +1002 ],
					[ 'xxx', +1003 ],
					[ 'bar', +2002 ],
					[ 'yyy', +2003 ],
				],
			)
			
		},
		
		'Merge branches with common base'() {
			
			const base = new $mol_crowd_set().fork(1).add( 'foo' ).add( 'bar' )
			
			const left = base.fork(2).add( 'xxx' )
			const right = base.fork(3).add( 'yyy' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				left.merge( right_event ).toJSON(),
				right.merge( left_event ).toJSON(),
				[
					[ 'foo', +1001 ],
					[ 'bar', +2001 ],
					[ 'xxx', +3002 ],
					[ 'yyy', +3003 ],
				],
			)
			
		},
		
		'Add conflicted with remove'() {
			
			const base = new $mol_crowd_set().fork(1).add( 'foo' )
			
			const left = base.fork(2).add( 'bar' )
			const right = base.fork(3).remove( 'bar' )
			
			const left_event = left.toJSON()
			const right_event = right.toJSON()
			
			$mol_assert_like(
				left.merge( right_event ).toJSON(),
				right.merge( left_event ).toJSON(),
				[
					[ 'foo', +1001 ],
					[ 'bar', -2003 ],
				],
			)
			
		},
		
		'Number ids support'() {
			
			$mol_assert_like(
				new $mol_crowd_set().fork(1).add( 1 ).add( 2 ).add( 2 ).toJSON(),
				[
					[ 1, +1001 ],
					[ 2, +3001 ],
				],
			)
			
		},
		
	})
}
