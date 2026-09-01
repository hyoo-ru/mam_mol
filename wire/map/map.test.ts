namespace $.$$ {
	$mol_test({
		
		"First defined as default delegate for internal"( $ ) {
			
			const { stamp, date, iso, internal } = $mol_wire_let({
				
				iso: ( next?: string )=> undefined as typeof next,
				stamp: ( next?: number )=> next,
				date: ( next?: Date )=> undefined as typeof next,
				
				internal: $mol_wire_map< string | undefined, string | undefined >(
					next => iso( next ),
					next => $mol_maybe(
						stamp( next?.valueOf && new Date( next ).valueOf() )
					).map( v => new Date(v).toISOString() )[0],
					next => date( next?.valueOf && new Date( next ) )?.toISOString(),
					next => next ?? '',
				)
			
			})
			
			$mol_assert_like( iso(), undefined )
			$mol_assert_like( stamp(), undefined )
			$mol_assert_like( date(), undefined )
			$mol_assert_like( internal(), '' )
			
			$mol_assert_like( stamp( 5 ), 5 )
			
			$mol_assert_like( iso(), undefined )
			$mol_assert_like( stamp(), 5 )
			$mol_assert_like( date(), undefined )
			$mol_assert_like( internal(), '1970-01-01T00:00:00.005Z' )
			
			$mol_assert_like( internal( '1970-01-01T00:00:00.007Z' ), '1970-01-01T00:00:00.007Z' )
			
			$mol_assert_like( iso(), undefined )
			$mol_assert_like( stamp(), 7 )
			$mol_assert_like( date(), undefined )
			$mol_assert_like( internal(), '1970-01-01T00:00:00.007Z' )
			
		},
		
	})
}