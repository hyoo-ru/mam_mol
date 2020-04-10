namespace $.$$ {

	$mol_test( {
		'simple'( $ ) {
			const app = $mol_view_tree_test_simple.make({
				$
			})

			$mol_assert_equal( app.some() , 1 )
			$mol_assert_equal( app.bool() , true )
			$mol_assert_equal( app.str() , 'test' )
			$mol_assert_ok( Array.isArray(app.arr()) )
		},

		'binding'( $ ) {
			const app = $mol_view_tree_test_binding.make({
				$
			})
			app.value(1)
			$mol_assert_equal( app.value() , 1 )

			app.head_complete_enabled()
			$mol_assert_not( app.enabled() )
		},
	} )
}
