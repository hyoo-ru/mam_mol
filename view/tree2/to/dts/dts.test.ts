namespace $ {

	$mol_test({

		'override mismatch assert for every class'( $ ) {

			const tree = $.$mol_tree2_from_string(
				'$mol_view_tree2_to_dts_test_foo $mol_view_tree2_to_dts_test_base\n\tbar \\\n',
				'test.view.tree',
			)

			const dts = $.$mol_tree2_text_to_string( $.$mol_view_tree2_to_dts( tree ) )

			$mol_assert_equal( 
				`$mol_view_override_mismatch< $mol_view_tree2_to_dts_test_foo, '$mol_view_tree2_to_dts_test_foo' >`
			 )

		},

	})

}
