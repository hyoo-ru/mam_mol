namespace $.$$ {

	const { per , rem } = $mol_style_unit

	$mol_style_define( $mol_scroll , {

		display: 'block',
		overflow: 'auto',
		flex: 'auto',
		alignSelf: 'stretch',
		boxSizing: 'border-box',
		willChange: 'scroll-position',
		transform: 'translateZ(0)', // enforce gpu scroll in all agents
		maxHeight: per(100),
		maxWidth: per(100),
		webkitOverflowScrolling: 'touch',
	
		'::-webkit-scrollbar': {
			width: rem(.5),
			height: rem(.5),
		},
		
		'::-webkit-scrollbar-corner': {
			background: $mol_theme.line,
		},

		'::-webkit-scrollbar-track': {
			background: $mol_theme.line,
		},

		'::-webkit-scrollbar-thumb': {
			background: $mol_theme.control,
		},

		'@media' : {
			'print' : {
				overflow: 'visible',
			},
		},

	})

}
