namespace $ {

	const { rem } = $mol_style_unit

	$mol_style_define( $mol_link , {
		
		textDecoration: 'none',
		color: $mol_theme.control,
		stroke: 'currentcolor',
		cursor: 'pointer',
		padding: $mol_gap.text,
		boxSizing: 'border-box',
		position: 'relative',
		minWidth: rem(2.5),
		gap: $mol_gap.space,
		
		border: {
			radius: $mol_gap.round,
		},

		':hover': {
			
			background: {
				color: $mol_theme.hover,
			},
			
		},

		':focus': {
			outline: 'none',
		},

		':focus-visible': {
			outline: 'none',
			background: {
				color: $mol_theme.hover,
			}
		},
		
		':active': {
			color: $mol_theme.focus,
		},

		'@': {
			mol_link_current: {
				'true': {
					color: $mol_theme.current,
					textShadow: '0 0',
				}
			}
		},
		
		':empty': {
			'::after': {
				content: '"\00A0"',
			},
		},
		
	} )

}
