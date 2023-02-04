namespace $.$$ {

	const { hsla } = $mol_style_func
	
	$mol_style_define( $mol_text_code_token, {

		display: 'inline',
		textDecoration: 'none',

		'@': {
			mol_text_code_token_type: {

				'code-keyword': {
					color: hsla( 0, 70, 60, 1 ),
				},
				
				'code-field': {
					color: hsla( 300, 70, 50, 1 ),
				},
				
				'code-tag': {
					color: hsla( 330, 70, 50, 1 ),
				},
				
				'code-global': {
					color: hsla( 30, 80, 50, 1 ),
				},
				
				'code-decorator': {
					color: hsla( 180, 40, 50, 1 ),
				},
				
				'code-punctuation': {
					color: hsla( 0, 0, 50, 1 ),
				},
				
				'code-string': {
					color: hsla( 90, 40, 50, 1 ),
				},
				
				'code-number': {
					color: hsla( 55, 65, 45, 1 ),
				},
				
				'code-call': {
					color: hsla( 270, 60, 50, 1 ),
				},
				
				'code-link': {
					color: hsla( 210, 60, 50, 1 ),
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
