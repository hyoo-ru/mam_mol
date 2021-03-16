namespace $ {
	$mol_test({
		
		'Change by different keys'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_list ).fork(1)
			val.get( 'foo' ).insert( 666 )
			val.get( 'bar' ).insert( 777 )
			val.get( 'foo' ).insert( 888, 0 )
			val.get( 'bar' ).cut( 777 )
			
			$mol_assert_like( val.toJSON(), $mol_crowd_delta(
				[ 'foo', 888, 666, 'bar', 777 ],
				[ 0, 3001, 1001, 0, -4001 ],
			) )
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_set ).fork(1)
			
			val.get( 'foo' ).add( 1 )
			val.get( 'bar' ).add( 2 )
			val.get( 'xxx' ).add( 3 )
			
			val.get( 'foo' ).add( 4 )
			val.get( 'bar' ).add( 5 )
			val.get( 'xxx' ).add( 6 )

			$mol_assert_like( val.toJSON( +3001 ), $mol_crowd_delta(
				[ 'foo', 4, 'bar', 5, 'xxx', 6 ],
				[ 0, +4001, 0, +5001, 0, +6001 ],
			) )
			
			$mol_assert_like( val.toJSON( +6001 ), $mol_crowd_delta([],[]) )
			
		},
		
		'Merge different documents'() {
			
			const left = new $mol_crowd_dict( $mol_crowd_list ).fork(1)
			left.get( 'foo' ).insert( 666 )
			left.get( 'bar' ).insert( 'xxx' )
			
			const right = new $mol_crowd_dict( $mol_crowd_list ).fork(2)
			right.get( 'foo' ).insert( 777 )
			right.get( 'bar' ).insert( 'yyy' )
			right.get( 'bar' ).insert( 'zzz' )
			
			const left_event = left.toJSON() 
			const right_event = right.toJSON() 
			
			$mol_assert_like(
				left.apply( right_event ).toJSON(),
				right.apply( left_event ).toJSON(),
				$mol_crowd_delta(
					[ 'foo', 777, 666, 'bar', 'yyy', 'zzz', 'xxx' ],
					[ 0, 1002, 1001, 0, 2002, 3002, 2001 ],
				),
			)
			
		},
		
		'Merge increases versions'() {
			
			const base = new $mol_crowd_dict( $mol_crowd_list )
			
			const left = base.fork(1)
			left.get( 'foo' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.get( 'bar' ).insert( 17 )
			right.get( 'bar' ).insert( 18 )
			
			left.apply( right.toJSON() )
			left.get( 'foo' ).insert( 'yyy' )
			
			$mol_assert_like( left.toJSON(), $mol_crowd_delta(
				[ 'foo', 'xxx', 'yyy', 'bar', 17, 18 ],
				[ 0, 1001, 3001, 0, 1002, 2002 ],
			) )
			
		},
		
	})
}
