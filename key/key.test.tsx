/** @jsx $mol_jsx */
namespace $ {
	$mol_test({
		
		'Primitives'() {
			
			$mol_assert_equal( $mol_key( null ), 'null' )
			$mol_assert_equal( $mol_key( false ), 'false' )
			$mol_assert_equal( $mol_key( true ), 'true' )
			$mol_assert_equal( $mol_key( 0 ), '0' )
			$mol_assert_equal( $mol_key( 1n<<64n ), '18446744073709551616n' )
			$mol_assert_equal( $mol_key( '' ), '""' )
			
		},
		
		'Array & POJO'() {
			
			$mol_assert_equal( $mol_key([ null ]), '[null]' )
			$mol_assert_equal( $mol_key({ foo: 0 }), '{"foo":0}' )
			$mol_assert_equal( $mol_key({ foo: [false] }), '{"foo":[false]}' )
			
		},
		
		'Function'() {
			
			const func = ()=> {}
			$mol_assert_equal( $mol_key( func ), $mol_key( func ) )
			$mol_assert_unique( $mol_key( func ), $mol_key( ()=> {} ) )
			
		},
		
		'Objects'() {
			
			class User {}
			const jin = new User()
			
			$mol_assert_equal( $mol_key( jin ), $mol_key( jin ) )
			$mol_assert_unique( $mol_key( jin ), $mol_key( new User() ) )
			
		},
		
		'Elements'() {
			
			const foo = <div>bar</div>
			
			$mol_assert_equal( $mol_key( foo ), $mol_key( foo ) )
			$mol_assert_unique( $mol_key( foo ), $mol_key( <div>bar</div> ) )
			
		},
		
		'Custom JSON representation'() {
			
			class User {
				constructor( public name: string, public age: number ) {}
				toJSON() { return { name: this.name } }
			}
			
			$mol_assert_equal( $mol_key( new User( 'jin', 18 ) ), '{"name":"jin"}' )
			
		},
		
		'Special native classes'() {
			
			$mol_assert_equal( $mol_key( new Date( 'xyz' ) ), 'null' )
			$mol_assert_equal( $mol_key( new Date( '2001-01-02T03:04:05.678Z' ) ), '"2001-01-02T03:04:05.678Z"' )
			
			$mol_assert_equal( $mol_key( /./ ), '"/./"' )
			$mol_assert_equal( $mol_key( /\./gimsu ), '"/\\\\./gimsu"' )
			
		},
		
	})
}
