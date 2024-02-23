namespace $ {
	$mol_test({
		
		'auto name'() {
			
			class Invalid extends $mol_error_mix {}
			const mix = new Invalid( 'foo' )
			
			$mol_assert_equal( mix.name, 'Invalid_Error' )
			
		},
		
		'simpe mix'() {
			
			const mix = new $mol_error_mix( 'foo',
				new Error( 'bar' ),
				new Error( 'lol' ),
			)
			
			$mol_assert_equal( mix.message, 'foo' )
			$mol_assert_equal( mix.errors.map( e => e.message ), [ 'bar', 'lol' ] )
			
		},
		
		'provide additional info'() {
			
			class Invalid extends $mol_error_mix {
				constructor(
					message: string,
					readonly cause: {
						value: string,
						hint: string,
					},
					... errors: readonly Error[]
				) {
					super( message, ... errors )
				}
			}
			
			const mix: unknown = new $mol_error_mix( 'Wrong password',
				new Invalid( 'Too short', { value: 'p@ssw0rd', hint: '> 8 letters' } ),
				new Invalid( 'Too simple', { value: 'p@ssw0rd', hint: 'need capital letter' } ),
			)
			
			const hints = [] as string[]
			
			if( mix instanceof $mol_error_mix ) {
				for( const er of mix.errors ) {
					if( er instanceof Invalid ) {
						hints.push( er.cause.hint )
					}
				}
			}
			
			$mol_assert_equal( hints, [ '> 8 letters', 'need capital letter' ] )
			
		},
		
	})
}
