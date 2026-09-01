namespace $ {

	$mol_test({

		'bidirectional bind'() {

			const hero = {
				pseudo_name : 'Batman'
			}

			const man = {
				real_name : 'Bruce Wayne'
			}

			$mol_bind( man , { real_name : 'pseudo_name' } , hero )
			$mol_assert_equal( man.real_name , 'Batman' )

			man.real_name = 'Jocker'
			$mol_assert_equal( hero.pseudo_name , 'Jocker' )
			
			hero.pseudo_name = 'Dark Knight'
			$mol_assert_equal( man.real_name , 'Dark Knight' )
			
		}
		
	})

}
