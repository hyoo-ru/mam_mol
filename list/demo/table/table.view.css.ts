namespace $.$$ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $mol_list_demo_table , {
		
		flex: {
			direction: 'column',
		},
		
		Rows: {
			flex: {
				grow: 1,
			},
		},
		
		Row: {
			boxShadow: `0 -1px 0 0 ${ $mol_theme.line }`,
		},
		
		Title_labeler: {
			flex: {
				basis: rem(15),
			},
		},

		Color_labeler: {
			flex: {
				basis: rem(10),
			},
		},

		Id_labeler: {
			flex: {
				basis: rem(5),
			},
			Label: {
				padding: {
					left: rem(2),
				},
			},
		},
		
		Id: {
			padding: $mol_gap.text,
		},
		
	})

}
