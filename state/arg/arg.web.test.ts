namespace $ {

	$mol_test_mocks.push( context => {
		class $mol_state_arg_mock extends $mol_state_arg {

			static $ = context
						
			@ $mol_mem
			static href( next? : string ) { return next || '' }
	
			@ $mol_action
			static go( next : { [ key : string ] : string | null } ) {
				this.href( this.link( next ) )
			}

		}
		context.$mol_state_arg = $mol_state_arg_mock
	} )

	$mol_test({
		
		'args as dictionary'( $ ) {
			
			$.$mol_state_arg.href( '#!foo=bar/xxx' )
			$mol_assert_equal( $.$mol_state_arg.dict() , { foo : 'bar' , xxx : '' } )

			$.$mol_state_arg.dict({ foo : null , yyy : '' , lol : '123' })
			$mol_assert_equal( $.$mol_state_arg.href().replace( /.*#/ , '#' ) , '#!yyy/lol=123' )

		} ,

		'one value from args'( $ ) {
			
			$.$mol_state_arg.href( '#!foo=bar/xxx' )
			$mol_assert_equal( $.$mol_state_arg.value( 'foo' ) , 'bar' )
			$mol_assert_equal( $.$mol_state_arg.value( 'xxx' ) , '' )

			$.$mol_state_arg.value( 'foo' , 'lol' )
			$mol_assert_equal( $.$mol_state_arg.href().replace( /.*#/ , '#' ) , '#!foo=lol/xxx' )

			$.$mol_state_arg.value( 'foo' , '' )
			$mol_assert_equal( $.$mol_state_arg.href().replace( /.*#/ , '#' ) , '#!foo/xxx' )

			$.$mol_state_arg.value( 'foo' , null )
			$mol_assert_equal( $.$mol_state_arg.href().replace( /.*#/ , '#' ) , '#!xxx' )

		} ,

		'nested args'( $ ) {

			const base = new $.$mol_state_arg( 'nested.' )

			class Nested extends $mol_state_arg {
				constructor( prefix : string ) {
					super( base.prefix + prefix )
				}
				static value = ( key : string , next? : string )=> base.value( key , next )
			}
			
			$.$mol_state_arg.href( '#!foo=bar/nested.xxx=123' )
			$mol_assert_equal( Nested.value( 'foo' ) , null )
			$mol_assert_equal( Nested.value( 'xxx' ) , '123' )

			Nested.value( 'foo' , 'lol' )
			$mol_assert_equal( $.$mol_state_arg.href().replace( /.*#/ , '#' ) , '#!foo=bar/nested.xxx=123/nested.foo=lol' )

		} ,

	})
	
}
