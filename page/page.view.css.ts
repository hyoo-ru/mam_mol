namespace $.$$ {

	const { per , rem } = $mol_style_unit
	const { calc } = $mol_style_func

	$mol_style_define( $mol_page , {

		display: 'flex' ,
		flex: {
			basis: 'auto' ,
			direction: 'column' ,
		},
		position: 'relative' ,
		alignSelf: 'stretch' ,
		maxWidth: per(100) ,
		maxHeight: per(100) ,
		boxSizing: 'border-box' ,
		color: $mol_theme.text ,
		// zIndex: 0 ,
		
		':focus': {
			outline: 'none',
		} ,

		Head: {
			display: 'flex' ,
			flexWrap: 'wrap' ,
			justifyContent: 'flex-end' ,
			flex: 'none',
			position: 'relative' ,
			margin: 0 ,
			minHeight: rem(4),
			padding: $mol_gap.block ,
			background: {
				color: $mol_theme.card ,
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: `0 0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)` ,
			zIndex: 2,
		},

		Title: {

			minHeight: rem(2),
			margin: 0,
			padding: $mol_gap.text,
			gap: $mol_gap.text,
			wordBreak: 'normal',
			textShadow: '0 0',

			font: {
				size: 'inherit',
				weight: 'normal',
			},
	
			flex: {
				grow: 1,
				shrink: 1,
				basis: 'auto',
			},

		},

		Tools: {
			
			flex: {
				basis: 'auto',
				grow: 1000,
				shrink: 1,
			},
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
			flexWrap: 'wrap',

		},

		Body: {
			flex: {
				grow: 1000,
				shrink: 1,
				basis: per(100),
			},
		},
		
		Body_content: {
			padding: $mol_gap.block ,
			flex: {
				direction: 'column',
			},
			justify: {
				self: 'stretch',
			},
		},
		
		Foot: {
			display: 'flex',
			justifyContent: 'space-between',
			flex: 'none',
			margin: 0,
			background: {
				color: $mol_theme.card ,
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: `0 -0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)` ,
			zIndex: 1,
			padding: $mol_gap.block ,
			':empty': {
				display: 'none',
			},
		},	

	} )
	
}
