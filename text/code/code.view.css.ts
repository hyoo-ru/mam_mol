namespace $.$$ {
	
	const { rem } = $mol_style_unit

	$mol_style_define( $mol_text_code, {

		padding: $mol_gap.text,
		whiteSpace: 'pre-wrap',
		
		font: {
			family: 'monospace',
		},
		
		'@': {
			'mol_text_code_sidebar_showed': {
				true: {
					margin: {
						left: rem(3),
					},
				},
			},
		},

	} )
	
}
