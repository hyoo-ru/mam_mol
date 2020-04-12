namespace $.$$ {

	$mol_test( {
		'simple props'( $ ) {
			const app = $mol_view_tree_test_simple.make({ $ })

			$mol_assert_equal( app.some() , 1 )
			$mol_assert_equal( app.bool() , true )
			$mol_assert_equal( app.str() , 'test' )
			$mol_assert_ok( Array.isArray(app.arr()) )
			$mol_assert_ok( Array.isArray(app.arr_string()) )
		},

		'default value'( $ ) {
			const app = $mol_view_tree_test_binding.make({ $ })
			$mol_assert_equal( app.value() , '123' )
		},

		'both binding'( $ ) {
			const app = $mol_view_tree_test_binding.make({ $ })

			$mol_assert_ok( app.value() !== 1 )

			app.value(1)
			$mol_assert_equal( app.value() , 1 )
		},

		'left binding'( $ ) {
			const app = $mol_view_tree_test_binding.make({ $ })

			$mol_assert_not( app.head_complete_enabled() )
			$mol_assert_not( app.enabled() )
		},

		'sub component'( $ ) {
			const app = $mol_view_tree_test_binding_right.make({ $ })
			$mol_assert_ok( app.Test() instanceof $mol_view_tree_test_binding_right_test)
		},

		'right binding - change owner property'( $ ) {
			const app = $mol_view_tree_test_binding_right.make({ $ })

			const val = 123

			$mol_assert_ok( app.outer_width() !== val )
			$mol_assert_ok( app.Test().width() !== val )

			app.outer_width(val)

			$mol_assert_equal( app.outer_width(), val )
			$mol_assert_equal( app.Test().width(), val )
		},

		'right binding - change part property'( $ ) {
			const app = $mol_view_tree_test_binding_right.make({ $ })

			const val = 123

			$mol_assert_ok( app.outer_width() !== val )
			$mol_assert_ok( app.Test().width() !== val )

			app.Test().width(val)

			$mol_assert_equal( app.Test().width(), val )
			$mol_assert_equal( app.outer_width(), val )
		},

		'attributes merging'( $ ) {
			const app = $mol_view_tree_test_attributes.make({ $ })

			$mol_assert_like( app.some(), { a: 1, b: 2 } )
		},

		'subcomponent indexed'( $ ) {
			const app = $mol_view_tree_test_attributes_subcomponent.make({ $ })
			const val = 123
			app.page = (index: any) => index

			$mol_assert_equal(app.Page(val).Sub(), val)
		},
 
	} )
}
