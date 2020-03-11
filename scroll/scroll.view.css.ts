namespace $.$$ {

	$mol_style_define( $mol_scroll , {

		display: 'block',
		overflow: 'auto',
		flex: {
			grow: 1,
			shrink: 1,
			basis: 'auto',
		},
		alignSelf: 'stretch',
		boxSizing: 'border-box',
		willChange: 'scroll-position',
		transform: 'translateZ(0)', // enforce gpu scroll in all agents
		boxShadow: `inset 0 0 0 .5px ${ $mol_theme.line }`,
		maxHeight: '100%',
		maxWidth: '100%',
		webkitOverflowScrolling: 'touch',
	
		'::-webkit-scrollbar': {
			width: '.5rem',
			height: '.5rem',
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
