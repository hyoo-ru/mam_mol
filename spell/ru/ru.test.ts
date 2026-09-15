namespace $ {
	$mol_test({
		
		'Word making'() {
			
			$mol_assert_equal( true, $mol_spell_ru.check( 'пил' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'пила' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'запил' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'завопил' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'пилил' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'пилоел' ) )
			$mol_assert_equal( true, $mol_spell_ru.check( 'недоперепилоперенедоела' ) )
			
		},
		
		'Wrong words'() {
			
			$mol_assert_equal( false, $mol_spell_ru.check( 'недперепила' ) )
			$mol_assert_equal( false, $mol_spell_ru.check( 'недоbook' ) )
			
		},
		
		'Segmentation'() {
			
			$mol_assert_equal( $mol_spell_ru.split( 'пил' ), [ "пил" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'пила' ), [ "пил", "а" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'запил' ), [ "за", "пил" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'завопил' ), [ "за", "во", "пил" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'пилил' ), [ "пил", "ил" ] )
			
			$mol_assert_equal( $mol_spell_ru.split( 'пилоел' ), [ "пил", "ое", "л" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'сине-зелёное' ), [ "син", "е", "-", "зелён", "ое" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'недоперепила' ), [ "недо", "пере", "пил", "а" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'перенедоела' ), [ "пере", "недо", "е", "л", "а" ] )
			$mol_assert_equal( $mol_spell_ru.split( 'недоперепилоперенедоела' ), [ "недо", "пере", "пил", "о", "пере", "недо", "е", "л", "а" ] )
			
			$mol_assert_equal( $mol_spell_ru.split( 'недперепилъ' ), [ "н", "ед", "пере", "пил", "ъ" ] )
			
		},
		
	})
}
