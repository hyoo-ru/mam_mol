namespace $.$$ {
	$mol_test({
		
		"Named composed scheme"( $ ) {
			
			$mol_assert_equal(
				'Some',
				class Some extends $mol_schema_enum([ 123, 321 ]) {} + '',
				class Some extends $mol_schema_some([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_maybe( $mol_schema_float ) {} + '',
				class Some extends $mol_schema_every([ $mol_schema_float ]) {} + '',
				class Some extends $mol_schema_list( $mol_schema_float ) {} + '',
				class Some extends $mol_schema_dict( $mol_schema_string, $mol_schema_string ) {} + '',
				class Some extends $mol_schema_record({ name: $mol_schema_string }) {} + '',
				class Some extends $mol_schema_partial({ name: $mol_schema_string }) {} + '',
			)
			
		},
		
	})
}
