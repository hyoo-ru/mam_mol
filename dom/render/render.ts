namespace $ {
	
	export interface $mol_dom_render_config {
		childNodes? : NodeList | Array< Node | string | number | boolean | { render : ()=> Node } >
		attributes? : { [ key : string ] : string|number|boolean }
		style? : { [ key : string ] : string|number }
		events? : { [ key : string ] : ( event : Event )=> any }
		events_async? : { [ key : string ] : ( event : Event )=> any }
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
					$mol_dom_render_childNodes( el , config.childNodes )
					break
				}
				
				case 'attributes' : {
					if( !config.attributes ) break
					$mol_dom_render_attributes( el , config.attributes )
					break
				}
				
				case 'style' : {
					if( !config.style ) break
					$mol_dom_render_style( el , config.style )
					break
				}
				
				case 'events' : {
					$mol_dom_render_event( el , config.events )
					break
				}
				
				case 'events_async' : {
					$mol_dom_render_event_async( el , config.events_async )
					break
				}
				
				default : {
					if( config[ key ] === void null ) continue
					
					if( el[ key ] !== config[ key ] ) {
						el[ key ] = config[ key ]
						if( el[ key ] !== config[ key ] ) {
							const setter = ()=> {
								el.removeEventListener( 'DOMNodeInsertedIntoDocument' , setter , { passive : true } as any )
								new $mol_defer( ()=> {
									el[ key ] = config[ key ]
								} )
							}
							el.addEventListener( 'DOMNodeInsertedIntoDocument' , setter , { passive : true } as any )
						}
					}
				}
			}
		}
		
		return el
	}
	
	export function $mol_dom_render_childNodes(
		el : Element ,
		childNodes? : NodeList | Array< Node | string | number | boolean | { render : ()=> Node } >
	) {
		const nodes = [] as ( Node | string )[]
		
		for( let i = 0 ; i < childNodes.length ; ++i ) {
			let node = childNodes[ i ] as any
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
	}
	
	export function $mol_dom_render_attributes(
		el : Element ,
		attrs? : { [ key : string ] : string|number|boolean }
	) {
		for( let name in attrs ) {
			let val = attrs[ name ] as any
			if( el.getAttribute( name ) === val ) continue
			if( val === null || val === false ) el.removeAttribute( name )
			else el.setAttribute( name , String( val ) )
		}
	}
	
	export function $mol_dom_render_style(
		el : Element ,
		styles? : { [ key : string ] : string|number }
	) {
		for( let name in styles ) {
			let val = styles[ name ]
			if( typeof val === 'number' ) val = `${ val }px`
			
			const style = ( <HTMLElement>el ).style as any
			if( val !== style[ name ] ) style[ name ] = val
		}
	}
	
	export function $mol_dom_render_event(
		el : Element ,
		events? : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , events[ name ] )
		}
	}
	
	export function $mol_dom_render_event_async(
		el : Element ,
		events? : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , events[ name ] , { passive : true } as any )
		}
	}
	
}
