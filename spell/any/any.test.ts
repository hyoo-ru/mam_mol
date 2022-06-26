namespace $ {
	$mol_test({
		
		'Known language'() {
			
			$mol_assert_equal( [ ... 'пила'.matchAll( $mol_spell_any  ) ][0]?.groups!.ru, 'пила' )
			
		},
		
		'Unknown language'() {
			
			$mol_assert_not( [ ... 'пиri'.matchAll( $mol_spell_any  ) ][0]?.groups )
			
		},
		
	})
}
