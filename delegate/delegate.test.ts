namespace $ {
	$mol_test({
		
		'get'() {
			const proxy = $mol_delegate( {} as any , ()=> ({ foo : 777 }) )
			$mol_assert_equal( proxy.foo , 777 )
		},

		'has'() {
			const proxy = $mol_delegate( {} as any , ()=> ({ foo : 777 }) )
			$mol_assert_equal( 'foo' in proxy , true )
		},

		'set'() {
			const target = { foo : 777 }
			const proxy = $mol_delegate( {} as any , ()=> target )
			proxy.foo = 123
			$mol_assert_equal( target.foo , 123 )
		},
		
		'getOwnPropertyDescriptor'() {

			const proxy = $mol_delegate( {} as any , ()=> ({ foo : 777 }) )
			
			$mol_assert_like(
				Object.getOwnPropertyDescriptor( proxy , 'foo' ),
				{
					value: 777,
					writable: true,
					enumerable: true,
					configurable: true,
				},
			)
			
		},

		'ownKeys'() {

			const proxy = $mol_delegate(
				{} as any ,
				()=> ({ foo : 777 , [ Symbol.toStringTag ] : 'bar' }),
			)
			
			$mol_assert_like(
				Reflect.ownKeys( proxy ),
				[ 'foo' , Symbol.toStringTag ],
			)

		},

		'getPrototypeOf'() {

			class Foo {}

			const proxy = $mol_delegate(
				{} as any ,
				()=> new Foo,
			)
			
			$mol_assert_equal(
				Object.getPrototypeOf( proxy ),
				Foo.prototype,
			)

		},

		'setPrototypeOf'() {

			class Foo {}
			const target = {}

			const proxy = $mol_delegate(
				{} ,
				()=> target,
			)

			Object.setPrototypeOf( proxy , Foo.prototype )
			
			$mol_assert_equal(
				Object.getPrototypeOf( target ),
				Foo.prototype,
			)

		},

		'instanceof'() {

			class Foo {}

			const proxy = $mol_delegate(
				{} ,
				()=> new Foo,
			)

			$mol_assert_ok( proxy instanceof Foo )
			$mol_assert_ok( proxy instanceof $mol_delegate )

		},

		'autobind'() {

			class Foo {}

			const proxy = $mol_delegate(
				{} ,
				()=> new Foo,
			)

			$mol_assert_ok( proxy.valueOf() instanceof Foo )
			$mol_assert_not( proxy.valueOf() instanceof $mol_delegate )

		},

	})
}
