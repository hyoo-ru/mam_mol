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
			flex: {
				grow: 0,
				shrink: 0,
				basis: $mol_style_unit.rem(3),
			},
		},
		
		Title: {
			fontWeight: 'bolder',
			flex: {
				grow: 1,
				shrink: 1,
				basis: $mol_style_unit.rem(20),
			},
			padding: '.5rem .5rem',
		},
		
		Link: {
			flex: {
				grow: 1000,
				shrink: 1,
				basis: $mol_style_unit.rem(10),
			},
			padding: '.5rem 1rem',
		},

		Editable: {
			Title: {
				verticalAlign: 'top',
			},
		},

		Priority: {
			
			flex: {
				grow: 0,
				shrink: 0,
				basis: 'auto',
			},
			padding: '.5rem',
			
			Option: {
				padding: '0 .5rem',
			},
			
		},

	})
}
