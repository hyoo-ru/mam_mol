namespace $.$$ {

	$mol_style_define( $mol_pop_demo , {

		flex: {
			direction: 'column'
		},

		alignItems: 'flex-start',

		Pop_area: {
			display: 'flex',

			padding: `10rem`,

			boxShadow: `0 0 0 1px ${$mol_theme.line}`,

			border: {
				radius: $mol_gap.round
			}
		},
		
		Other: {
			padding: $mol_gap.text,
		},

	})
}
