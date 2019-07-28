namespace $ {

	@ $mol_class
	class Plus1 extends $mol_wrapper {

		static run( task : ()=> number ) {
			return task.call( this ) + 1
		}
		
	}

	$mol_test({

		'run callback' () {

			$mol_assert_equal( Plus1.run( ()=> 2 ) , 3 )

		} ,

		'wrap function' () {

			const obj = {
				level : 2 ,
				square1 : Plus1.func( function( this : { level : number } , a ) {
					return a ** this.level
				} )
			}

			$mol_assert_equal( obj.square1( 2 ) , 5 )

		} ,

		'decorate instance method' () {

			class Foo1 {

				level = 2

				@ Plus1.method
				square1( a : number ) {
					return a ** this.level
				}
				
			}
			
			const Foo2 = Foo1
			const foo = new Foo2

			$mol_assert_equal( foo.square1( 2 ) , 5 )

		} ,

		'decorate static method' () {
			
			@ $mol_class
			class Foo {

				static level = 2

				@ Plus1.method
				static square1( a : number ) {
					return a ** this.level
				}

			}

			$mol_assert_equal( Foo.square1( 2 ) , 5 )

		} ,

		'decorate class' () {
			
			@ $mol_class
			class FooInc extends $mol_wrapper {

				static run( task : ()=> Foo ) {
					const foo = task.call( this )
					foo.bar ++
					return foo
				}

			}
			
			@ FooInc.class
			@ $mol_class
			class Foo {
				constructor( public bar : number ) { }
			}

			$mol_assert_equal( new Foo( 2 ).bar , 3 )

		} ,

	})
}
