namespace $.$$ {

	const { rem } = $mol_style_unit
	const { calc } = $mol_style_func

	$mol_style_define( $mol_pop_demo , {

		flex: {
			direction: 'column'
		},

		alignItems: 'flex-start',

		Pop_area: {
			display: 'flex',

			padding: rem( 10 ),

			boxShadow: `0 0 0 1px ${$mol_theme.line}`,

			border: {
				radius: $mol_gap.round
			}
		}

	})
}
