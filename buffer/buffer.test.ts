namespace $ {
	$mol_test({
		'buffer from string'() {
			const str = 'Hello, ΧΨΩЫ'
			const buffer = $mol_buffer.from(str)

			$mol_assert_equal( buffer.toString(), str )
		}
	})
}
