namespace $.$$ {

	$mol_test( {
		async 'simple properties'( $ ) {
			// const value = require('./sample/simple.view.tree.ex')
			const value = await $mol_fiber_async(() => $mol_file.relative('mol/view/tree2/test/sample/simple.view.tree.ex').text())()

			console.log(111, value)
			// const app = $mol_view_tree2_test_sample_simple.make({ $ })

			// $mol_assert_equal( app.num() , 123 )
			// $mol_assert_equal( app.bool() , true )
			// $mol_assert_equal( app.str() , 'some' )
			// $mol_assert_equal( app.nul() , null )
		},

		'localized'( $ ) {
			// const app = $mol_view_tree2_test_sample_simple.make({ $ })

			// $mol_assert_equal( app.localized() , 'localized value' )
		},
	} )
}
