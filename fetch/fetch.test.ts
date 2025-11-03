namespace $.$$ {
	$mol_test({
		
		async "Get and parse"( $ ) {
			$mol_assert_equal(
				await $mol_wire_async( $mol_fetch ).text( 'data:text/plain,foo' ),
				'foo',
			)
		},
		
	})
}
