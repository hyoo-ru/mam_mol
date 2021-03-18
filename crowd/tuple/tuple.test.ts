namespace $ {
	$mol_test({
		
		'Default state'() {
			
			const store = $mol_crowd_tuple.of({
				keys: $mol_crowd_list,
				vals: $mol_crowd_dict.of( $mol_crowd_reg ),
			}).make()
			
			$mol_assert_like( store.for('keys').items, [] )
			$mol_assert_like( store.for('vals').for( 'foo' ).str, '' )
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta([],[]) )
			
		},
		
		'Changed state'() {
			
			const Map = $mol_crowd_tuple.of({
				vers: $mol_crowd_numb,
				keys: $mol_crowd_set,
				vals: $mol_crowd_dict.of( $mol_crowd_reg ),
			})
			
			const store = Map.make().fork(1)
			
			store.for( 'keys' ).add( 'foo' ).add( 'bar' )
			store.for( 'vals' ).for( 'xxx' ).value = 'yyy'
			
			$mol_assert_like( store.for('vers').numb, 0 )
			$mol_assert_like( store.for('keys').items, [ 'foo', 'bar' ] )
			$mol_assert_like( store.for('vals').for( 'xxx' ).str, 'yyy' )
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta(
				[ 'keys', 'foo', 'bar', 'vals', 'xxx', 'yyy' ],
				[ -2, +1001, +2001, -2, -1, +3001 ],
			) )
			
		},
		
		'Tuple of tuples'() {
			
			const Point = $mol_crowd_tuple.of({
				X: $mol_crowd_numb,
				Y: $mol_crowd_numb,
			})
			
			const Rect = $mol_crowd_tuple.of({
				TL: Point,
				BR: Point,
			})
			
			const store = Rect.make().fork(1)
			
			store.for( 'TL' ).for( 'X' ).shift( -2 )
			store.for( 'TL' ).for( 'Y' ).shift( -3 )
			store.for( 'BR' ).for( 'X' ).shift( +5 )
			store.for( 'BR' ).for( 'Y' ).shift( +7 )
			
			$mol_assert_like( store.for( 'TL' ).for( 'X' ).value, -2 )
			$mol_assert_like( store.for( 'TL' ).for( 'Y' ).value, -3 )
			$mol_assert_like( store.for( 'BR' ).for( 'X' ).value, +5 )
			$mol_assert_like( store.for( 'BR' ).for( 'Y' ).value, +7 )
			
			$mol_assert_like( store.toJSON(), $mol_crowd_delta(
				[ "TL", "X", -2, "Y", -3, "BR", "X", +5, "Y", +7 ],
				[ -4, -1, +1001, -1, +2001, -4, -1, +3001, -1, +4001 ],
			) )
			
		},
		
	})
}
