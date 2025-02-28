namespace $ {

	const { rem } = $mol_style_unit
	
	$mol_style_define( $mol_html_view , {

		Heading: {

			padding: $mol_gap.text,
			textShadow: '0 0',
			
			'@': {
				'mol_html_view_heading': {
					'1': {
						font : {
							size: rem(1.5),
						},
					},
					'2': {
						font : {
							size: rem(1.5),
							style: 'italic',
						},
					},
					'3': {
						font : {
							size: rem(1.25),
						},
					},
					'4': {
						font : {
							size: rem(1.25),
							style: 'italic',
						},
					},
					'5': {
						font : {
							size: rem(1),
						},
					},
					'6': {
						font : {
							size: rem(1),
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
				left: rem(.75),
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
			textShadow: '0 0',
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
			color: $mol_theme.special,
		},

		Subscript: {
			display: 'inline',
			font: {
				size: '.75em',
			},
			position: 'relative',
			bottom: '-0.5em',
		},

		Superscript: {
			display: 'inline',
			font: {
				size: '.75em',
			},
			position: 'relative',
			top: '-0.25em',
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
