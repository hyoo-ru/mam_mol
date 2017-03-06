namespace $ {
	
	export interface $mol_dom_render_config {
		childNodes? : NodeList | Array< Node | string | number | boolean | { render : ()=> Node } >
		attributes? : { [ key : string ] : string|number|boolean }
		style? : { [ key : string ] : string|number }
		[ key : string ] : any
	}
	
	export function $mol_dom_render( el : Element , config : $mol_dom_make_config ) {
		const document = el.ownerDocument
		
		for( let key in config ) {
			switch( key ) {
				case 'localName' : break
				case 'namespaceURI' : break
				
				case 'childNodes' : {
					if( !config.childNodes ) break
					const nodes = [] as ( Node | string )[]
					
					for( let i = 0 ; i < config.childNodes.length ; ++i ) {
						let node = config.childNodes[ i ] as any
						if( node == null ) continue
						if( Object( node ) === node ) {
							if( node[ 'render' ] ) node = node[ 'render' ]()
							nodes.push( node )
						} else {
							nodes.push( String( node ) )
						}
					}
					
					let nextNode = el.firstChild
					for( let view_ of nodes ) {
						const view = view_.valueOf() as Node

						if( view instanceof $mol_dom_context.Node ) {

							while( true ) {
								if( !nextNode ) {
									el.appendChild( view )
									break
								}
								if( nextNode == view ) {
									nextNode = nextNode.nextSibling
									break
								} else {
									if( nodes.indexOf( nextNode ) === -1 ) {
										const nn = nextNode.nextSibling
										el.removeChild( nextNode )
										nextNode = nn
									} else {
										el.insertBefore( view , nextNode )
										break
									}
								}
							}

						} else {
							if( nextNode && nextNode.nodeName === '#text' ) {
								nextNode.nodeValue = String( view )
								nextNode = nextNode.nextSibling
							} else {
								const textNode = $mol_dom_context.document.createTextNode( String( view ) )
								el.insertBefore( textNode , nextNode )
							}
						}

					}
					
					while( nextNode ) {
						const currNode = nextNode
						nextNode = currNode.nextSibling
						el.removeChild( currNode )
					}
					
					break
				}
				
				case 'attributes' : {
					const attrs = config.attributes
					
					for( let name in attrs ) {
						let val = attrs[ name ] as any
						if( el.getAttribute( name ) === val ) continue
						if( val === null || val === false ) el.removeAttribute( name )
						else el.setAttribute( name , String( val ) )
					}
					
					break
				}
				
				case 'style' : {
					const styles = config.style
					
					for( let name in styles ) {
						let val = styles[ name ]
						if( typeof val === 'number' ) val = `${ val }px`
						
						const style = ( <HTMLElement>el ).style as any
						if( val !== style[ name ] ) style[ name ] = val
					}
					
					break
				}
				
				default : {
					if( el[ key ] !== config[ key ] ) {
						el[ key ] = config[ key ]
						if( el[ key ] !== config[ key ] ) {
							const setter = ()=> {
								el.removeEventListener( 'DOMNodeInsertedIntoDocument' , setter , true )
								new $mol_defer( ()=> {
									el[ key ] = config[ key ]
								} )
							}
							el.addEventListener( 'DOMNodeInsertedIntoDocument' , setter , true )
						}
					}
				}
			}
		}
		
		return el
	}
	
}
