namespace $.$$ {
	
	const { rem } = $mol_style_unit

	$mol_style_define( $mol_text_code_row, {

		display: 'block',
		
		margin: {
			left: rem(3),
		},
		
		'::before': {
			content: 'attr(mol_text_code_row_numb)',
			textAlign: 'right',
			color: $mol_theme.shade,
			width: rem(1.5),
			padding: {
				right: rem(1.5),
			},
			margin: {
				left: rem(-3),
			},
			display: 'inline-block',
			whiteSpace: 'nowrap',
		},

	} )
	
}
