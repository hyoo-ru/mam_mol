namespace $ {

	$mol_test({

		'run callback' () {

			class Plus1 extends $mol_wrapper {
		
				static wrap< This , Args extends any[] >( task : ( this : This , ... args : Args )=> number ) {
		
					return function( this : This , ... args : Args ) {
						return task.call( this , ... args ) + 1 as number
					}
		
				}
				
			}
		
			$mol_assert_equal( Plus1.run( ()=> 2 ) , 3 )

		} ,

		'wrap function' () {
		
			class Plus1 extends $mol_wrapper {
		
				static wrap< This , Args extends any[] >( task : ( this : This , ... args : Args )=> number ) {
		
					return function( this : This , ... args : Args ) {
						return task.call( this , ... args ) + 1 as number
					}
		
				}
				
			}
				
			const obj = {
				level : 2 ,
				pow : Plus1.func( function( this : { level : number } , a ) {
					return a ** this.level
				} )
			}

			$mol_assert_equal( obj.pow( 2 ) , 5 )

		} ,

		'decorate instance method' () {

			class Plus1 extends $mol_wrapper {
		
				static wrap< This , Args extends any[] >( task : ( this : This , ... args : Args )=> number ) {
		
					return function( this : This , ... args : Args ) {
						return task.call( this , ... args ) + 1 as number
					}
		
				}
				
			}
		
			class Foo1 {

				level = 2

				@ Plus1.method
				pow( a : number ) {
					return a ** this.level
				}
				
			}
			
			const Foo2 = Foo1
			const foo = new Foo2

			$mol_assert_equal( foo.pow( 2 ) , 5 )

		} ,

		'decorate static method' () {
			
			class Plus1 extends $mol_wrapper {
		
				static wrap< This , Args extends any[] >( task : ( this : This , ... args : Args )=> number ) {
		
					return function( this : This , ... args : Args ) {
						return task.call( this , ... args ) + 1 as number
					}
		
				}
				
			}
		
			class Foo {

				static level = 2

				@ Plus1.method
				static pow( a : number ) {
					return a ** this.level
				}

			}

			$mol_assert_equal( Foo.pow( 2 ) , 5 )

		} ,

		'decorate class' () {
			
			class BarInc extends $mol_wrapper {

				static wrap< This , Args extends any[] >( task : ( this : This , ... args : Args )=> Foo ) {
					
					return function( this : This , ... args : Args ) {

						const foo = task.call( this , ...args )
						foo.bar ++
						return foo
						
					}

				}

			}
			
			@ BarInc.class
			class Foo {
				constructor( public bar : number ) {}
			}

			$mol_assert_equal( new Foo( 2 ).bar , 3 )

		} ,

	})
}
