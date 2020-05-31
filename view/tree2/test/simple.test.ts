namespace $.$$ {

	$mol_test( {
		async 'simple'( $ ) {
			const rec = await $.$mol_view_tree2_test('mol/view/tree2/test/sample/simple')
			$mol_assert_equal(rec.sample, rec.content)
		},

		'localized'( $ ) {
		},
	} )
}
