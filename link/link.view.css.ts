namespace $ {

	$mol_style_define( $mol_link , {
		
		textDecoration: 'none',
		color: $mol_theme.control,
		stroke: 'currentColor',
		cursor: 'pointer',
		padding: '.5rem',
		boxSizing: 'border-box',
		position: 'relative',

		':hover': {
			backgroundColor: $mol_theme.hover,
		},

		':focus': {
			outline: 'none',
			backgroundColor: $mol_theme.hover,
		},

		'@': {
			mol_link_current: {
				'true': {
					backgroundColor: $mol_theme.current,
					color: $mol_theme.text,				
				}
			}
		},

	} )

}
