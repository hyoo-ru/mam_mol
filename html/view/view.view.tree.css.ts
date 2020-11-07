namespace $ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $mol_html_view , {

		padding: $mol_gap.block,

		Heading: {

			padding: $mol_gap.block,
			
			'@': {
				'mol_html_view_heading': {
					'1': {
						font : {
							size: rem(2),
						},
					},
					'2': {
						font : {
							size: rem(2),
							style: 'italic',
						},
					},
					'3': {
						font : {
							size: rem(1.5),
						},
					},
					'4': {
						font : {
							size: rem(1.5),
							style: 'italic',
						},
					},
					'5': {
						font : {
							size: rem(1.25),
						},
					},
					'6': {
						font : {
							size: rem(1.25),
							style: 'italic',
						},
					},
				},
			},

		},
		
		Paragraph: {
			display: 'block',
			flex: {
				wrap : 'wrap',
			},
			padding: $mol_gap.text,
		},

		List: {
			display: 'block',
			flex: {
				wrap : 'wrap',
			},
			padding: $mol_gap.block,
		},

		Quote: {
			display: 'block',
			flex: {
				'wrap' : 'wrap',
			},
			padding: $mol_gap.block,
			margin: {
				left: rem(.5),
			},
			box: {
				shadow: [{
					inset: true,
					x: rem(.25),
					y: 0,
					blur: 0,
					spread: 0,
					color: $mol_theme.line,
				}],
			},
		},

		Strong: {
			display: 'inline',
			color: $mol_theme.focus,
		},

		Emphasis: {
			display: 'inline',
			font: {
				style : 'italic',
			},
		},

		Deleted: {
			display: 'inline',
			color: $mol_theme.shade,
		},

		Inserted: {
			display: 'inline',
			font: {
				weight: 'bolder',
			},
		},

		Link: {
			margin: rem(-.5),
		},

		Code: {
			display: 'inline',
			font: {
				family: 'monospace',
			},
			whiteSpace: 'pre-wrap',
		},

		Image: {
			display: 'inline-block',
		},

		Break: {
			display: 'block',
			height: $mol_gap.block,
		},

		Text: {
			display: 'inline',
		},

	} )

}
