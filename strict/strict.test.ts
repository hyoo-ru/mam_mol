namespace $ {
	$mol_test({
		
		'object to primitive'( $ ) {
			
			class Foo extends Object {
				[ Symbol.toPrimitive ]( hint: string ) { return 321 }
				valueOf() { return 123 }
				toString() { return 'foo' }
			}
			
			$mol_assert_equal( ( new Foo as any ) - 1, 320 )
			$mol_assert_equal( new Foo + '!', '321!' )
			$mol_assert_equal( `${ new Foo }!`, '321!' )
			
			$mol_assert_fail( ()=> ( {} as number ) + 1, 'Field Symbol(Symbol.toPrimitive) is not defined' )
			$mol_assert_fail( ()=> ({}) + '!', 'Field Symbol(Symbol.toPrimitive) is not defined' )
			$mol_assert_fail( ()=> `${ {} }!`, 'Field Symbol(Symbol.toPrimitive) is not defined' )
			
		},
		
		'unknown properties'( $ ) {
			
			$mol_assert_equal( [ 777 ][0], 777 )
			$mol_assert_equal( [].slice, Array.prototype.slice )
			$mol_assert_equal( ({ foo: 777 }).foo, 777 )
			$mol_assert_ok( 'foo'.slice )
			
			$mol_assert_fail( ()=> [ 777 ][1], 'Field "1" is not defined' )
			$mol_assert_fail( ()=> [ 777 ]['foo'], 'Field "foo" is not defined' )
			$mol_assert_fail( ()=> 'foo'['bar'], 'Field "bar" is not defined' )
			
		},
		
		'unknown properties of custom obects'( $ ) {
			
			class Foo extends Object {
				foo = 123
			}
			
			$mol_assert_equal( new Foo().foo, 123 )
			$mol_assert_fail( ()=> new Foo()['bar'], 'Field "bar" is not defined' )
			
		},
		
		'prototype pollution'( $ ) {
			
			const obj = { foo: 123 } as any
			obj.__proto__ = { bar: 321 }
			
			$mol_assert_equal( Reflect.getPrototypeOf( obj ), Reflect.getPrototypeOf({}) )
			$mol_assert_like( obj.__proto__, { bar: 321 } )
			$mol_assert_equal( obj.bar, undefined )
			
		},
		
	})
}
