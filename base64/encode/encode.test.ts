namespace $ {
	const png = new Uint8Array([ 0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda ])

	$mol_test({
		'base64 encode string'() {
			$mol_assert_equal($mol_base64_encode('Hello, ΧΨΩЫ'), 'SGVsbG8sIM6nzqjOqdCr')
		},

		'base64 encode binary'() {
			$mol_assert_equal($mol_base64_encode(png), 'GgoASUh42g==')
		},

		'base64 encode string with plus'() {
			$mol_assert_equal($mol_base64_encode('шоешпо'), '0YjQvtC10YjQv9C+')
		},
	})
}
