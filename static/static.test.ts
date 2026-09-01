namespace $ {
	export class $mol_static_test_object extends $mol_object2 {
		static test = []
	}

	$mol_test({

		'Context not passed without helper'($) {
			const custom = $.$mol_ambient({})
			$mol_assert_unique(custom.$mol_static_test_object.$, custom)
		},

		'Context passed with helper'($) {
			const custom = $.$mol_ambient({})
			$mol_assert_equal(custom.$mol_static.$mol_static_test_object.$, custom)
		},

		'Inherited context in static class'($) {
			$mol_assert_unique($.$mol_static_test_object.$, $.$mol_static.$mol_static_test_object.$)
			$mol_assert_equal($.$mol_static.$mol_static_test_object.$, $)

			$mol_assert_equal($.$mol_static($mol_static_test_object).$, $)
		},

		'Returns subclass'($) {
			const proto = Object.getPrototypeOf($.$mol_static.$mol_static_test_object)
			$mol_assert_equal(proto, $mol_static_test_object)
		},

		'Caching class'($) {
			let first = $.$mol_static.$mol_static_test_object
			$mol_assert_equal($.$mol_static.$mol_static_test_object, first)
		},

		'Caching class if call as function'($) {
			let first = $.$mol_static($mol_static_test_object)
			$mol_assert_equal($.$mol_static($mol_static_test_object), first)
		},

		'Calling as prop and as function results equal classes'($) {
			$mol_assert_equal($.$mol_static.$mol_static_test_object, $.$mol_static($mol_static_test_object))
		},
	})
}

