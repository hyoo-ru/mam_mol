namespace $.$$ {
	$mol_style_define( $mol_list_demo_table , {

		Row: {

			padding: '0',
			boxShadow: `0 0 0 .5px ${ $mol_theme.line }`,

			'>': {
				
				$mol_view: {
					margin: '0',
				},

			},

		},

		Id: {
			textAlign: 'right',
			padding: '.5rem .5rem',
			flex: '0 0 3rem',
		},
		
		Title: {
			fontWeight: 'bolder',
			flex: '1 1 20rem',
			padding: '.5rem .5rem',
		},
		
		Link: {
			flex: '1000 1 10rem',
			padding: '.5rem 1rem',
		},

		Editable: {
			Title: {
				verticalAlign: 'top',
			},
		},

		Priority: {
			
			flex: 'none',
			padding: '.5rem',
			
			Option: {
				padding: '0 .5rem',
			},
			
		},

	})
}
