namespace $.$$ {
	
	const { rem, px } = $mol_style_unit

	$mol_style_define( $mol_text_code, {

		whiteSpace: 'pre-wrap',
		
		Rows: {
			padding: $mol_gap.text,
		},

		Row: {
			font: {
				family: 'inherit',
			},
		},
		
		Copy: {
			alignSelf: 'flex-start',
			justifySelf: 'flex-start',
		},
		
		'@': {
			'mol_text_code_sidebar_showed': {
				true: {
					$mol_text_code_row: {
						margin: {
							left: rem(1.75),
						},
					},
				},
			},
		},

	} )
	
}
