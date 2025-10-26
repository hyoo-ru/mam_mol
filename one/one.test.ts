namespace $ {
	export class $mol_one_test_object extends $mol_object2 {}

	$mol_test({

		'Inerited context in instance'($) {
			$mol_assert_unique($.$mol_one_test_object.$, $.$mol_one.$mol_one_test_object.$)
			$mol_assert_equal($.$mol_one.$mol_one_test_object.$ === $)
		},

		'Returns instance'($) {
			$mol_assert_equal($.$mol_one.$mol_one_test_object instanceof $mol_one_test_object)
		},

		'Caching instance'($) {
			let first = $.$mol_one.$mol_one_test_object
			$mol_assert_equal($.$mol_one.$mol_one_test_object === first)
		},

		'Caching instance if call as function'($) {
			let first = $.$mol_one($mol_one_test_object)
			$mol_assert_equal($.$mol_one($mol_one_test_object) === first)
		},

		'Calling as prop and as function results equal instances'($) {
			$mol_assert_equal($.$mol_one.$mol_one_test_object === $.$mol_one($mol_one_test_object))
		},
	})
}

