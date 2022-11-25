namespace $ {
	$mol_test({
		
		'serial & parse'() {
			
			const data = [
				{ foo: '123', bar: '456' },
				{ foo: 'x"xx', bar: 'y"y"y' },
			]
			
			$mol_assert_like(
				$mol_csv_parse( $mol_csv_serial( data ) ),
				data
			)
			
		},
		
		'parse & serial'() {
			
			const csv = 'foo,bar\n"123","456"\n"x""xx","y""y""y"'
			
			$mol_assert_like(
				$mol_csv_serial( $mol_csv_parse( csv ) ),
				csv
			)
			
		},
		
	})
}
