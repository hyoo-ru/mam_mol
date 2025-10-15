namespace $ {
	const png = new Uint8Array([ 0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda ])

	const with_plus = new TextEncoder().encode('шоешпо')

	$mol_test({
		'base64 decode string'() {
			$mol_assert_equal($mol_base64_decode('SGVsbG8sIM6nzqjOqdCr'), new TextEncoder().encode('Hello, ΧΨΩЫ'))
		},

		'base64 decode binary'() {
			$mol_assert_equal($mol_base64_decode('GgoASUh42g=='), png)
		},

		'base64 decode binary - without equals'() {
			$mol_assert_equal($mol_base64_decode('GgoASUh42g'), png)
		},

		'base64 decode with plus'() {
			$mol_assert_equal($mol_base64_decode('0YjQvtC10YjQv9C+'), with_plus)
		},

		'base64 decode with plus - url version'() {
			$mol_assert_equal($mol_base64_decode('0YjQvtC10YjQv9C-'), with_plus)
		}
	})
}
