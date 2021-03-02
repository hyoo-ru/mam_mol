namespace $.$$ {

	const { rem } = $mol_style_unit

	$mol_style_define( $mol_select_list , {
		
		flex: {
			wrap: 'wrap',
			shrink: 1,
		},
		
		'>': {
			$mol_view: {
				
				margin: {
					right: rem(-.75),
				},
				
				':last-child': {
					margin: {
						right: 0,
					},
				},
				
			},
		},
		
	} )
	
}
