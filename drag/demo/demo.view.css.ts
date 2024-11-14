namespace $.$$ {

	const {rem,px} = $mol_style_unit

	$mol_style_define( $mol_drag_demo , {

		Task_content: {
			padding: $mol_gap.text,
			color: $mol_theme.control,

			':hover': {
				background: $mol_theme.hover,
			},
		},
		
		Task_drop:{
			'@': {
				mol_drop_status: {
					drag: {
						boxShadow: `inset 0 1px 0 0px ${ $mol_theme.focus }`,
					},
				},
			},
		},

		List_drop: {
			'@': {
				mol_drop_status: {
					drag: {
						// '>' : {
						// 	$mol_view : {
								':last-child': {
									boxShadow: `inset 0 -1px 0 0px ${ $mol_theme.focus }`,
								},
						// 	},
						// },
					},
				},
			},
		},
		
		Trash: {
			padding: $mol_gap.text,
			flex: {
				grow: 1,
			},
		},

		Trash_drop: {
			'@': {
				mol_drop_status: {
					drag: {
						background: {
							color: $mol_theme.hover,
						},
					},
				},
			},
		},
		
		List: {
			padding: $mol_gap.text,
		},

	})

}
