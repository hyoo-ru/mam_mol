namespace $ {
	$mol_test({
		'base64 decode string'() {
			$mol_assert_like($mol_base64_decode_string('SGVsbG8sIM6nzqjOqdCr'), 'Hello, ΧΨΩЫ')
		},
	})
}
