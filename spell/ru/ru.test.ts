namespace $ {
	$mol_test({
		
		'Word making'() {
			
			$mol_assert_ok( $mol_spell_ru.test( 'пил' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'пила' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'запил' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'завопил' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'пилил' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'пилоел' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'недоперепилоперенедоела' ) )
			
		},
		
		'Wrong words'() {
			
			$mol_assert_not( $mol_spell_ru.test( 'недперепила' ) )
			$mol_assert_not( $mol_spell_ru.test( 'недоbook' ) )
			
		},
		
	})
}
