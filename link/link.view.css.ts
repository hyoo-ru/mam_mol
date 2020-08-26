namespace $ {

	const { rem } = $mol_style_unit
	const { rgba } = $mol_style_func

	$mol_style_define( $mol_link , {
		
		textDecoration: 'none',
		color: $mol_theme.control,
		stroke: 'currentcolor',
		cursor: 'pointer',
		padding: [ rem(.5) , rem(.75) ],
		boxSizing: 'border-box',
		position: 'relative',

		':hover': {
			background: {
				color: $mol_theme.hover,
			},
		},

		':focus': {
			outline: 'none',
			background: {
				color: $mol_theme.hover,
			}
		},

		':focus-within': {
			outline: 'none',
			background: {
				color: $mol_theme.hover,
			}
		},

		'@': {
			mol_link_current: {
				'true': {
					background: {
						color: $mol_theme.back,
					},
					color: $mol_theme.text,
				}
			}
		},

	} )

}
