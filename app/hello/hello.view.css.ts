namespace $.$$ {

	const { rem } = $mol_style_unit

	$mol_style_define( $mol_app_hello , {

		display: 'flex',
		flex: {
			direction: 'column',
			shrink: 1,
			grow: 1,
			basis: 'auto',
		},
		alignItems: 'center',
		alignSelf: 'stretch',

		margin: 0,

		font: {
			family: 'sans-serif',
			size: rem(1.5),
		},
		boxShadow: '0 0 0 1px var(--mol_theme_line)',
		
		Name: {
			margin: rem(1),
			width: rem(14),	
			flex: {
				grow: 0,
			},
		},

	} )

}
