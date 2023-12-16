namespace $ {
	function get_parts(str: string) {
		return $$.$mol_view_tree2_prop_parts($mol_tree2.struct(str))
	}

	$mol_test({
		'wrong order'($) {
			$mol_assert_fail(() => {
				get_parts('some_bla?*')
			}, '`Cyrillic symbol in some_bla?*? `Required prop like some*? at `?#1:1/0`')
		},

		'empty'($) {
			$mol_assert_fail(() => {
				get_parts('')
			}, '``Required prop like some*? at `?#1:1/0`')
		},

		'prop in upper case'($) {
			const parts = get_parts('Close_icon')
			$mol_assert_equal(parts.name, 'Close_icon')
			$mol_assert_equal(parts.key, '')
			$mol_assert_equal(parts.next, '')
		},

		'prop with index'($) {
			const parts = get_parts('some_bla*')
			$mol_assert_equal(parts.name, 'some_bla')
			$mol_assert_equal(parts.key, '*')
			$mol_assert_equal(parts.next, '')
		},

		'prop with index and value'($) {
			const parts = get_parts('some_bla*?')
			$mol_assert_equal(parts.name, 'some_bla')
			$mol_assert_equal(parts.key, '*')
			$mol_assert_equal(parts.next, '?')
		},

		'legacy indexed'($) {
			const parts = get_parts('Some*default')
			$mol_assert_equal(parts.name, 'Some')
			$mol_assert_equal(parts.key, '*')
			$mol_assert_equal(parts.next, '')
		},

		'legacy indexed value'($) {
			const parts = get_parts('Some*k?v')
			$mol_assert_equal(parts.name, 'Some')
			$mol_assert_equal(parts.key, '*')
			$mol_assert_equal(parts.next, '?')
		}
	})
}
