namespace $.$$ {
	
	export class $mol_page extends $.$mol_page {
		
		body_scroll_top( next? : number ) {
			return $mol_state_session.value( `${ this }.body_scroll_top()` , next ) || 0
		}
		
	}

	$mol_style_define( $mol_page , {

		display: 'flex' ,
		margin: '0' ,
		flexDirection: 'column' ,
		flex: '1 1 auto' ,
		position: 'relative' ,
		alignSelf: 'stretch' ,
		maxWidth: '100%' ,
		maxHeight: '100%' ,
		boxSizing: 'border-box' ,
		background: $mol_theme.back ,
		color: $mol_theme.text ,
		zIndex: '0' ,
		overflow: 'hidden' ,
		boxShadow: `inset 0 0 0 .5px ${ $mol_theme.line }` ,

		':focus': {
			outline: 'none',
		} ,

		Head: {
			display: 'flex' ,
			flexWrap: 'wrap' ,
			justifyContent: 'space-between' ,
			flex: '0 0 auto' ,
			position: 'relative' ,
			margin: '0' ,
			minHeight: 'calc( 1.5em + 1rem )' ,
			padding: '.5rem' ,
		},

		Title: {

			flex: '1000 1 50%',
			padding: '.5rem',
			wordBreak: 'normal',
			cursor: 'default',

			':empty': {
				display: 'none',
			},
	
		},

		Tools: {
			
			flex: '1 1 auto',
			display: 'flex',
			justifyContent: 'flex-end',

			':empty': {
				display: 'none',
			},

		},

		Body: {
			flex: '1000 1 100%',
			margin: '0',
		},

		Foot: {
			display: 'flex',
			justifyContent: 'space-between',
			flex: '0 0 auto',
			margin: '0',
			overflow: 'hidden',
		}		

	} )
	
}
