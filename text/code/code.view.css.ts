namespace $.$$ {

	const { vary, hsla } = $mol_style_func
	
	$mol_style_define( $mol_text_code, {

		padding: $mol_gap.text,
		whiteSpace: 'pre-wrap',
		font: {
			family: 'monospace',
		},

		Row: {
			display: 'block',
		},

	} )
	
	$mol_style_define( $mol_text_code_token, {

		display: 'inline',

		'@': {
			mol_text_code_token_type: {

				'code-keyword': {
					color: hsla(0, 70, 60, 1),
				},
				
				'code-field': {
					color: hsla(300, 70, 60, 1 ),
				},
				
				'code-tag': {
					color: hsla(330, 70, 60, 1 ),
				},
				
				'code-global': {
					color: hsla(210, 80, 60, 1 ),
				},
				
				'code-decorator': {
					color: hsla(180, 40, 60, 1 ),
				},
				
				'code-punctuation': {
					color: hsla( 0, 0, 50, 1 ),
				},
				
				'code-string': {
					color: hsla(90, 40, 50, 1 ),
				},
				
				'code-number': {
					color: hsla(60, 70, 30, 1 ),
				},
				
				'code-call': {
					color: hsla(270, 60, 60, 1 ),
				},
				
				'code-link': {
					color: hsla(240, 60, 60, 1 ),
				},
				
				'code-comment-inline': {
					opacity: .5,
				},
				
				'code-comment-block': {
					opacity: .5,
				},
				
				'code-docs': {
					opacity: .75,
				},
				
			},
		}

	} )

}
