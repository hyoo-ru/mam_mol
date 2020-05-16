namespace $.$$ {

	const {rem,px} = $mol_style_unit

	$mol_style_define( $mol_drag_demo , {
		
		Task_drop:{
			'@': {
				mol_drop_status: {
					drag: {
						boxShadow: `0 -1px 0 0px ${ $mol_theme.focus }`,
					},
				},
			},
		},

		List: {
			padding: rem(.75),
		},
		
		List_drop: {
			'@': {
				mol_drop_status: {
					drag: {
						'>' : {
							$mol_view : {
								':last-child': {
									boxShadow: `0 1px 0 0px ${ $mol_theme.focus }`,
								},
							},
						},
					},
				},
			},
		},
		
		Trash: {
			padding: [ rem(1) , rem(1.5) ],
			display: 'block',
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
		
	})

}
