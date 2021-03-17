namespace $ {
	$mol_test({
		
		'Change by different keys'() {
			
			const val = $mol_crowd_dict.of( $mol_crowd_list ).make().fork(1)
			val.for( 'foo' ).insert( 666 )
			val.for( 'bar' ).insert( 777 )
			val.for( 'foo' ).insert( 888, 0 )
			val.for( 'bar' ).cut( 777 )
			
			$mol_assert_like( val.toJSON(), $mol_crowd_delta(
				[ 'foo', 888, 666, 'bar', 777 ],
				[ 0, 3001, 1001, 0, -4001 ],
			) )
			
		},
		
		'Slice after version'() {
			
			const val = $mol_crowd_dict.of( $mol_crowd_set ).make().fork(1)
			
			val.for( 'foo' ).add( 1 )
			val.for( 'bar' ).add( 2 )
			val.for( 'xxx' ).add( 3 )
			
			val.for( 'foo' ).add( 4 )
			val.for( 'bar' ).add( 5 )
			val.for( 'xxx' ).add( 6 )

			$mol_assert_like( val.toJSON( +3001 ), $mol_crowd_delta(
				[ 'foo', 4, 'bar', 5, 'xxx', 6 ],
				[ 0, +4001, 0, +5001, 0, +6001 ],
			) )
			
			$mol_assert_like( val.toJSON( +6001 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Merge different documents'() {
			
			const left = $mol_crowd_dict.of( $mol_crowd_list ).make().fork(1)
			left.for( 'foo' ).insert( 666 )
			left.for( 'bar' ).insert( 'xxx' )
			
			const right = $mol_crowd_dict.of( $mol_crowd_list ).make().fork(2)
			right.for( 'foo' ).insert( 777 )
			right.for( 'bar' ).insert( 'yyy' )
			right.for( 'bar' ).insert( 'zzz' )
			
			const left_delta = left.toJSON() 
			const right_delta = right.toJSON() 
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 777, 666, 'bar', 'yyy', 'zzz', 'xxx' ],
					[ 0, 1002, 1001, 0, 2002, 3002, 2001 ],
				),
			)
			
		},
		
		'Merge increases versions'() {
			
			const base = $mol_crowd_dict.of( $mol_crowd_list ).make()
			
			const left = base.fork(1)
			left.for( 'foo' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.for( 'bar' ).insert( 17 )
			right.for( 'bar' ).insert( 18 )
			
			left.apply( right.toJSON() )
			left.for( 'foo' ).insert( 'yyy' )
			
			$mol_assert_like( left.toJSON(), $mol_crowd_delta(
				[ 'foo', 'xxx', 'yyy', 'bar', 17, 18 ],
				[ 0, 1001, 3001, 0, 1002, 2002 ],
			) )
			
		},
		
		'Dictionary of Union'() {
			
			const base = $mol_crowd_dict.of( $mol_crowd_union.of({
				string: $mol_crowd_reg,
				array: $mol_crowd_list,
				object: $mol_crowd_set,
			}) ).make()

			const left = base.fork(1)
			const right = base.fork(2)
			
			left.for( 'foo' ).to( 'string' ).str = 'bar'
			right.for( 'foo' ).to( 'array' ).insert( 'xxx' )
			
			const left_delta = left.delta( base )
			const right_delta = right.delta( base )
			
			$mol_assert_like(
				left.apply( right_delta ).toJSON(),
				right.apply( left_delta ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 'array', 'xxx', 'bar' ],
					[ 0, 1002, 2002, 2001 ],
				),
			)
			
		},
		
	})
}
