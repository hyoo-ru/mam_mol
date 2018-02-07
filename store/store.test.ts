namespace $ {

	$mol_test({

		'default data' () {

			const store = new $mol_store({
				foo : 1 ,
				bar : 2 ,
			})

			$mol_assert_equal( store.data().foo , 1 )
			$mol_assert_equal( store.data().bar , 2 )

		} ,

		'safe reference' () {

			const foo = { foo : 1 }
			const bar = { bar : 1 }

			const store = new $mol_store({ foo , bar })

			store.data({
				foo : { foo : 1 } ,
				bar : { bar : 3 } ,
			})

			$mol_assert_equal( store.data().foo , foo )
			$mol_assert_unique( store.data().bar , bar )

		} ,

		'get and set by shapshot' () {

			const store = new $mol_store({
				foo : 1 ,
				bar : 2 ,
			})

			$mol_assert_equal( store.snapshot() , '{"foo":1,"bar":2}' )

			store.snapshot( '{"foo":2,"bar":1}' )

			$mol_assert_equal( store.data().foo , 2 )
			$mol_assert_equal( store.data().bar , 1 )

		} ,

		'get and set by key' () {

			const store = new $mol_store({
				foo : 1 ,
			})

			$mol_assert_equal( store.value( 'foo' ) , 1 )

			store.value( 'foo' , 2 )

			$mol_assert_equal( store.value( 'foo' ) , 2 )

		} ,

		'get and set by lens' () {

			const store = new $mol_store({
				foo : 1 ,
			})

			const lens = store.sub( 'foo' )

			$mol_assert_equal( lens.data() , 1 )

			lens.data( 2 )

			$mol_assert_equal( lens.data() , 2 )

		} ,

		'views and actions' () {

			const Person = class extends $mol_store<{ name : { first : string , last : string } }> {
				
				get full_name() {
					const name = this.value( 'name' )
					return name.first + ' ' + name.last
				}

				swap_names() {
					const name = this.value( 'name' )
					this.value( 'name' , {
						first : name.last ,
						last : name.first ,
					} )
				}

			}

			const store = new Person({
				name : {
					first : 'Foo' ,
					last : 'Bar' ,
				} ,
			})

			$mol_assert_equal( store.full_name , 'Foo Bar' )

			store.swap_names()

			$mol_assert_equal( store.full_name , 'Bar Foo' )

		} ,


	})

}
