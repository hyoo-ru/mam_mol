namespace $.$$ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $mol_list_demo_table , {
		
		Rows: {
			flex: {
				grow: 1,
			},
		},
		
		Row: {
			boxShadow: `0 1px 0 0 ${ $mol_theme.line }`,
		},
		
		$mol_labeler: {
			flex: {
				basis: rem(14),
			},
		},

		Id_labeler: {
			flex: {
				grow: 0,
				shrink: 1,
				basis: rem(7),
			},
		},
		
		Id: {
			padding: $mol_gap.text,
		},
		
		Title: {
			fontWeight: 'bolder',
			padding: $mol_gap.text,
		},
		
	})

}
