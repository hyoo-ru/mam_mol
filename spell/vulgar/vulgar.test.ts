namespace $.$$ {
	$mol_test({
		
		"Vulgar words check"( $ ) {
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'хуй' ) )
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'хуяк' ) )
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'хуеблядь' ) )
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'заебись' ) )
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'заёбанный' ) )
			$mol_assert_equal( true, $mol_spell_vulgar.check( 'хуемразь' ) )
		},
		
		"Non-Vulgar words check"( $ ) {
			$mol_assert_equal( false, $mol_spell_vulgar.check( 'жуй' ) )
			$mol_assert_equal( false, $mol_spell_vulgar.check( 'хутор' ) )
			$mol_assert_equal( false, $mol_spell_vulgar.check( 'заштрихуй' ) )
			$mol_assert_equal( false, $mol_spell_vulgar.check( 'смехуечки' ) )
		},
		
	})
}
