namespace $ {

	export function $mol_dom_render_children (
		el : Element ,
		childNodes : NodeList | Array< Node | string | null >
	) {
		const node_set = new Set< Node | string | null >( childNodes )
		
		let nextNode : Node | null = el.firstChild
		for( let view of childNodes ) {

			if( view == null ) continue

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
						if( node_set.has( nextNode ) ) {
							el.insertBefore( view , nextNode )
							break
						} else {
							const nn = nextNode.nextSibling
							el.removeChild( nextNode )
							nextNode = nn
						}
					}
				}
				
			} else {
				if( nextNode && nextNode.nodeName === '#text' ) {
					const str = String( view )
					if( nextNode.nodeValue !== str ) nextNode.nodeValue = str
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

}
