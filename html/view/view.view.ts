namespace $.$$ {

	const warned = new Set< string >()

	/**
	 * Safe virtualized view of raw HTML.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_html_view_demo
	 */
	export class $mol_html_view extends $.$mol_html_view {

		@ $mol_mem
		dom() {
			return this.$.$mol_dom_parse( this.html() , 'text/html' ).body
		}

		sub() {
			return this.content( this.dom() )
		}

		@ $mol_mem_key
		content( node : Node ) {
			
			const res = [] as $mol_view[]
			
			for( const child of node.childNodes ) {
				res.push( ... this.views( child ) )
			}
				
			return res
		}

		views( node : Node ) {
			switch( node.nodeName ) {
					
				case '#comment':
					return []
				
				case '#text':
				case '#cdata-section':
					if( !node.textContent!.trim() ) return []
					return [ this.Text( node ) ]
				
				case 'H1':
				case 'H2':
				case 'H3':
				case 'H4':
				case 'H5':
				case 'H6':
					return [ this.Heading( node ) ]

				case 'P':
				case 'LI':
				case 'PRE':
				case 'DIV':
					return [ this.Paragraph( node ) ]
							
				case 'UL':
				case 'OL':
					return [ this.List( node ) ]
				
				case 'BLOCKQUOTE':
					return [ this.Quote( node ) ]
				
				case 'STRONG':
				case 'B':
					return [ this.Strong( node ) ]
				
				case 'EM':
				case 'I':
					return [ this.Emphasis( node ) ]
				
				case 'DEL':
				case 'S':
					return [ this.Deleted( node ) ]
				
				case 'INS':
				case 'U':
					return [ this.Inserted( node ) ]
				
				case 'SUB':
					return [ this.Subscript( node ) ]
				
				case 'SUP':
					return [ this.Superscript( node ) ]

				case 'A':
					return [ this.Link( node ) ]

				case 'PRE':
				case 'CODE':
					return [ this.Code( node ) ]

				case 'IMG':
					return [ this.Image( node ) ]

				case 'BR':
					return [ this.Break( node ) ]

				default:

					if( !warned.has( node.nodeName ) ) {

						this.$.$mol_log3_warn({
							place: `${this}.views()`,
							message: 'Unsupported tag',
							tag: node.nodeName,
							hint: 'Add support to $mol_html_view',
						})
						
						warned.add( node.nodeName )
						
					}
					
					return this.content( node )
				
			}
		}

		text( node : Node ) {
			return node.textContent ?? '???'
		}

		safe_link( uri : string ) {

			const base =  $mol_dom_context.location.href
			const url = new $mol_dom_context.URL( uri , base )
			
			if( /^\w*script:/i.test( url.protocol ) ) {
				return this.xss_uri() + uri
			}
			
			return uri
	
		}

		link_uri( node : HTMLAnchorElement ) {
			return this.safe_link( node.href )
		}

		image_uri( node : HTMLImageElement ) {
			return this.safe_link( node.src )
		}

		heading_level( node : HTMLHeadingElement ) {
			return Number( node.nodeName.substring( 1 ) )
		}

	}
}
