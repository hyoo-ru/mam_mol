namespace $ {

	$mol_test({

		'memoize field' () {

			class Foo {

				static one = 1

				@ $mol_memo.field
				static get two() {
					return ++ this.one
				}
				static set two( next : number ) {} 
				
			}
			
			$mol_assert_equal( Foo.two , 2 )
			$mol_assert_equal( Foo.two , 2 )

			Foo.two = 3
			
			$mol_assert_equal( Foo.two , 3 )
			$mol_assert_equal( Foo.two , 3 )

		} ,

	})

}
