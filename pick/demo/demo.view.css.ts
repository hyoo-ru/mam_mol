namespace $.$$ {

	const { rem } = $mol_style_unit

	$mol_style_define( $mol_pick_demo , {

		Demo_caption: {
			padding: $mol_gap.text
		},

		// $mol_pick_demo.Simple_pop()
		Simple_pop: {
			
			// $mol_pick_demo.Simple_pop().Trigger()
			Trigger: {
				justifyContent: 'center'
			},

			Bubble: {
				padding: rem( 0.5 )
			}

		},

		/* Show delete confirmation dialog buttons on one line */
		Delete_buttons: {
			flex: {
				wrap: 'nowrap'
			}
		}

	})
}
