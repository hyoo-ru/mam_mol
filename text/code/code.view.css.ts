namespace $.$$ {
	
	const { rem } = $mol_style_unit

	$mol_style_define( $mol_text_code, {

		padding: $mol_gap.text,
		whiteSpace: 'pre-wrap',
		
		'@': {
			'mol_text_code_sidebar_showed': {
				true: {
					$mol_text_code_row: {
						margin: {
							left: rem(1.5),
						},
					},
				},
			},
		},

	} )
	
}
