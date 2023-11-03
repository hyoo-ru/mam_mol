namespace $.$$ {
	
	$mol_style_define( $mol_theme_demo_case, {
		
		flex: {
			direction: `row`,
			shrink: 0,
			grow: 0,
		},
		gap: $mol_gap.block,
		padding: $mol_gap.block,
		
		$mol_button_copy: {
			color: `inherit`,
			font: {
				family: `monospace`,
			},
		},
		
		Shade: {
			color: $mol_theme.shade,
		},
		
		Field: {
			background: {
				color: $mol_theme.field,
			},
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: `1px`,
					color: $mol_theme.line,
				}]
			},
		},
		
		Line: {
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: `1px`,
					color: $mol_theme.line,
				}]
			},
		},
		
		Focus: {
			color: $mol_theme.focus,
			background: {
				color: $mol_theme.field,
			},
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: `1px`,
					color: $mol_theme.focus,
				}]
			},
		},
		
		Control: {
			color: $mol_theme.control,
		},
		
		Hover: {
			color: $mol_theme.control,
			background: {
				color: $mol_theme.hover,
			},
		},
		
		Current: {
			color: $mol_theme.current,
		},
		
		Special: {
			color: $mol_theme.special,
		},
		
		Card1: {
			background: {
				color: $mol_theme.card,
			},
			padding: $mol_gap.block,
			border: {
				radius: $mol_gap.round,
			},
		},
		
		Card2: {
			textShadow: `0 0`,
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},
		
	} )
	
}
