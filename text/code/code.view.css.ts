namespace $.$$ {
	
	const { rem, px } = $mol_style_unit

	$mol_style_define( $mol_text_code, {

		whiteSpace: 'pre-wrap',
		
		Rows: {
			padding: $mol_gap.text,
		},
		
		Copy: {
			position: 'sticky',
			alignSelf: 'flex-start',
			justifySelf: 'flex-start',
			top: 0,
			left: 0,
			Icon: {
				background: {
					color: $mol_theme.card,
				},
			},
			transform: 'translate( -14px, -2px )',
		},
		
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
