namespace $ {

	export function $mol_dom_render_children (
		el : Element ,
		childNodes : NodeList | Array< Node | string | number | boolean | { dom_tree : ()=> Node } >
	) {
		const node_list = [] as ( Node | string )[]
		const node_set = new Set<Node>()
		
		for( let i = 0 ; i < childNodes.length ; ++i ) {
			let node = childNodes[ i ] as any
			if( node == null ) continue
			if( Object( node ) === node ) {
				if( node[ 'dom_tree' ] ) node = node[ 'dom_tree' ]()
				node_list.push( node )
				node_set.add( node )
			} else {
				node_list.push( String( node ) )
			}
		}
		
		let nextNode : Node | null = el.firstChild
		for( let view_ of node_list ) {
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
