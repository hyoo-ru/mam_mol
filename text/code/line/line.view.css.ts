namespace $.$$ {
	
	const { rem } = $mol_style_unit

	$mol_style_define( $mol_text_code_line, {

		display: 'block',
		position: 'relative',
		
		font: {
			family: 'monospace',
		},
		
		Numb: {
			textAlign: 'right',
			color: $mol_theme.shade,
			width: rem(3),
			margin: {
				left: rem(-4),
			},
			display: 'inline-block',
			whiteSpace: 'nowrap',
			userSelect: 'none',
			position: 'absolute',
		},
		
	} )
	
}
