namespace $.$$ {

	$mol_style_define( $mol_page , {

		display: 'flex' ,
		margin: '0' ,
		flexDirection: 'column' ,
		flex: {
			grow: 1,
			shrink: 1,
			basis: 'auto',
		},
		position: 'relative' ,
		alignSelf: 'stretch' ,
		maxWidth: '100%' ,
		maxHeight: '100%' ,
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
			flex: {
				grow: 0,
				shrink: 0,
				basis: 'auto',
			},
			position: 'relative' ,
			margin: '0' ,
			minHeight: 'calc( 1.5em + 2rem )' ,
			padding: '.5rem' ,
		},

		Title: {

			flex: {
				grow: 1000,
				shrink: 1,
				basis: $mol_style_unit.per(50),
			},
			padding: '.5rem',
			wordBreak: 'normal',
			cursor: 'default',

			':empty': {
				display: 'none',
			},
	
		},

		Tools: {
			
			flex: {
				grow: 1,
				shrink: 1,
				basis: 'auto',
			},
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
			margin: '0',
		},

		Foot: {
			display: 'flex',
			justifyContent: 'space-between',
			flex: {
				grow: 0,
				shrink: 0,
				basis: 'auto',
			},
			margin: '0',
			overflow: 'hidden',
		},	

	} )
	
}
