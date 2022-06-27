namespace $ {
	$mol_test({
		
		'Known language'() {
			
			$mol_assert_ok( $mol_spell_any.test( 'пила' ) )
			
		},
		
		'Unknown language'() {
			
			$mol_assert_not( $mol_spell_any.test( 'пиri' ) )
			
		},
		
	})
}
