namespace $ {
	$mol_test({
		
		'Word making'() {
			
			$mol_assert_ok( $mol_spell_ru.test( 'недоперепила' ) )
			$mol_assert_ok( $mol_spell_ru.test( 'пилоело' ) )
			
		},
		
		'Wrong words'() {
			
			$mol_assert_not( $mol_spell_ru.test( 'недперепила' ) )
			$mol_assert_not( $mol_spell_ru.test( 'недоbook' ) )
			
		},
		
	})
}
