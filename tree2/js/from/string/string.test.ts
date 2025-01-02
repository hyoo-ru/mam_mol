namespace $ {
	$mol_test({
		
		'homogeneous binary sequence'($) {
			$mol_assert_equal(
				$.$mol_tree2_js_from_string(`1+2+3`).toString(),
				$.$mol_tree2_from_string(`
					(+)
						1
						2
						3
				`).toString(),
			)
		},
		
		'heterogeneous binary sequence with same precedence'($) {
			$mol_assert_equal(
				$.$mol_tree2_js_from_string(`1+2-3+4`).toString(),
				$.$mol_tree2_from_string(`
					(+)
						(-)
							(+)
								1
								2
							3
						4
				`).toString(),
			)
		},
		
		'heterogeneous binary sequence with different precedence'($) {
			$mol_assert_equal(
				$.$mol_tree2_js_from_string(`1*2+3/4`).toString(),
				$.$mol_tree2_from_string(`
					(+)
						(*)
							1
							2
						(/)
							3
							4
				`).toString(),
			)
		},
		
		'changing precedence by parenthesises'($) {
			$mol_assert_equal(
				$.$mol_tree2_js_from_string(`1*(2+3)/4`).toString(),
				$.$mol_tree2_from_string(`
					(/)
						(*)
							1
							(+)
								2
								3
						4
				`).toString(),
			)
		},
		
	})
}
