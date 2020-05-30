namespace $.$$ {
	$mol_test( {
		'simple properties'( $ ) {
			const { content } = $.$mol_view_tree2_compile_test(require('./sample/simple.view.tree'))
			$mol_assert_equal(content, require('./sample/simple.ts.sample'))
		},
	} )
}
