namespace $ {

	$mol_test({

		'override mismatch assert for every class'( $ ) {

			const tree = $.$mol_tree2_from_string(
				'$mol_view_tree2_to_dts_test_foo $mol_view_tree2_to_dts_test_base\n\tbar \\\n',
				'test.view.tree',
			)

			$mol_assert_equal(
				$.$mol_tree2_text_to_string( $.$mol_view_tree2_to_dts( tree ) ),
				[
					'declare namespace $ {',
					'',
					'\texport class $mol_view_tree2_to_dts_test_foo extends $mol_view_tree2_to_dts_test_base {',
					'\t\tbar( ): string',
					'\t}',
					'\t',
					'\ttype $mol_view_tree2_to_dts_test_foo__override_1 = $mol_type_enforce<',
					'\t\t$mol_view_override_mismatch< $mol_view_tree2_to_dts_test_foo, \'$mol_view_tree2_to_dts_test_foo\' >',
					'\t\t,',
					'\t\t\'Override differs from view.tree prop only by case\'',
					'\t>',
					'\t',
					'}',
					'',
				].join( '\n' ),
			)

		},

	})

}
