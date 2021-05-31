namespace $ {

	function attrs_belt( separator : string ) : Record< string, $mol_tree2_hack<never> > {
		return {

			'': ( input )=> [
				input.data( ' ' ),
				input.data( $mol_html_encode( input.type ) ),
				... input.value ? [
					input.data( '"' ),
					input.data( $mol_html_encode( input.value ) ),
					input.data( '"' ),
				] : [],
				... input.hack({

					'': ( input )=> {

						if( !input.type ) return [
							input.data( separator ),
							input.data( '"' ),
							input.data( $mol_html_encode( input.text() ) ),
							input.data( '"' ),
						]

						$mol_fail( new SyntaxError( 'Wrong attribute value' ) )

					},

				}),
			],

		}
	}
	
	export function $mol_tree2_xml_to_text( xml: $mol_tree2 ) {
		return xml.list(
			xml.hack({

				'@': ( input, belt )=> [],

				'--': ( input, belt )=> [
					xml.struct( 'line', [
						input.data( '<!-- ' ),
						... input.hack( belt ),
						input.data( ' -->' ),
					] ),
				],

				'?': ( input, belt )=> [
					xml.struct( 'line', [
						input.data( '<?' ),
						input.kids[0].data( input.kids[0].type ),
						... input.kids[0].hack( attrs_belt( '=' ) ),
						input.data( '?>' ),
					] ),
				],

				'!': ( input, belt )=> [
					xml.struct( 'line', [
						input.data( '<!' ),
						input.kids[0].data( input.kids[0].type ),
						... input.kids[0].hack( attrs_belt( ' ' ) ),
						input.data( '>' ),
					] ),
				],

				'': ( input, belt )=> {

					if( !input.type ) return [
						input.data( $mol_html_encode( input.text() ) ),
					]

					const attrs = input.select( '@', null ).hack( attrs_belt( '=' ) )
					const content = input.hack( belt )
					
					return [
						input.struct( 'line', [
							input.data( `<` ),
							input.data( input.type ),
							... attrs,
							... content.length ? [
								input.data( `>` ),
								input.struct( 'indent', content ),
								input.data( `</` ),
								input.data( input.type ),
								input.data( `>` ),
							] : [
								input.data( ` />` ),
							]
						] ),
					]

				},

			}),
		)
	}

}
