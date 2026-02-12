namespace $ {
	$mol_test({
		
		'serial & parse'() {
			
			const data = [
				{ foo: '123', bar: '456' },
				{ foo: 'x"xx', bar: 'y,y\ny' },
			]
			
			$mol_assert_equal(
				$mol_csv_parse( $mol_csv_serial( data ) ),
				data
			)
			
		},
		
		'parse & serial'() {
			
			const csv = '"foo","bar"\n"123","456"\n"x""xx","y,y\ny"'
			
			$mol_assert_equal(
				$mol_csv_serial( $mol_csv_parse( csv ) ),
				csv
			)
			
		},
		
		'one row'() {
			
			const csv = '"foo","y,y\ny"'
			
			$mol_assert_equal(
				$mol_csv_serial_table( $mol_csv_parse_table( csv ) ),
				csv
			)
			
		},
		
		'one col'() {
			
			const csv = '"foo"\n"y,y\ny"'
			
			$mol_assert_equal(
				$mol_csv_serial( $mol_csv_parse( csv ) ),
				csv
			)
			
		},
		
		'one cell'() {
			
			const csv = '"y,y\ny"'
			
			$mol_assert_equal(
				$mol_csv_serial_table( $mol_csv_parse_table( csv ) ),
				csv
			)
			
		},
		
		'tab separated'() {
			
			const tsv = '"foo"\t"bar"\n"123"\t"456"\n"x""xx"\t"y,y\ny"'
			
			$mol_assert_equal(
				$mol_csv_serial( $mol_csv_parse( tsv, '\t' ), '\t' ),
				tsv
			)
			
		},
		
	})
}
