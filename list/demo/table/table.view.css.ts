namespace $.$$ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $mol_list_demo_table , {

		Row: {

			padding: 0,
			boxShadow: `0 0 0 .5px ${ $mol_theme.line }`,

			'>': {
				
				$mol_view: {
					margin: 0,
				},

			},

		},

		Id: {
			justifyContent: 'flex-end',
			padding: rem(.5),
			flex: {
				grow: 0,
				shrink: 0,
				basis: rem(3.5),
			},
		},
		
		Title: {
			fontWeight: 'bolder',
			flex: {
				grow: 1,
				shrink: 1,
				basis: rem(20),
			},
			padding: rem(.5),
		},
		
		Link: {
			flex: {
				grow: 1000,
				shrink: 1,
				basis: rem(10),
			},
			padding: [ rem(.5) , rem(1) ],
		},

		Editable: {
			Title: {
				verticalAlign: 'top',
			},
		},

		Priority: {
			
			flex: 'none',
			padding: rem(.5),
			
			Option: {
				padding: [ 0 , rem(.5) ],
			},
			
		},

	})

}
