namespace $.$$ {
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
					return [ this.Paragraph( node ) ]
							
				case 'DIV':
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
					console.warn(node.nodeName, node)
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
