namespace $.$$ {

	const { per , rem } = $mol_style_unit
	const { calc } = $mol_style_func

	$mol_style_define( $mol_page , {

		display: 'flex' ,
		margin: 0 ,
		flexDirection: 'column' ,
		flex: 'auto',
		position: 'relative' ,
		alignSelf: 'stretch' ,
		maxWidth: per(100) ,
		maxHeight: per(100) ,
		boxSizing: 'border-box' ,
		background: $mol_theme.back ,
		color: $mol_theme.text ,
		zIndex: '0' ,
		overflow: 'hidden',
		boxShadow: `inset 0 0 0 .5px ${ $mol_theme.line }` ,

		':focus': {
			outline: 'none',
		} ,

		Head: {
			display: 'flex' ,
			flexWrap: 'wrap' ,
			justifyContent: 'space-between' ,
			flex: 'none',
			position: 'relative' ,
			margin: 0 ,
			minHeight: calc(`1.5em + 2rem`) ,
			padding: rem(.5) ,
			background: $mol_theme.back ,
			boxShadow: `0 0 .5rem hsla(0,0%,0%,.25)` ,
			zIndex: '0',
		},

		Title: {

			flex: {
				grow: 1000,
				shrink: 1,
				basis: $mol_style_unit.per(50),
			},
			padding: rem(.5),
			wordBreak: 'normal',
			cursor: 'default',
			fontWeight: 'bolder',

			':empty': {
				display: 'none',
			},
	
		},

		Tools: {
			
			flex: 'auto',
			display: 'flex',
			justifyContent: 'flex-end',

			':empty': {
				display: 'none',
			},

		},

		Body: {
			flex: {
				grow: 1000,
				shrink: 1,
				basis: $mol_style_unit.per(100),
			},
			margin: 0,
		},

		Foot: {
			display: 'flex',
			justifyContent: 'space-between',
			flex: 'none',
			margin: 0,
			overflow: 'hidden',
			background: $mol_theme.back ,
			boxShadow: `0 0 .5rem hsla(0,0%,0%,.25)` ,
			zIndex: '0',
		},	

	} )
	
}
