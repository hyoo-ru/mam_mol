namespace $ {
	
	export function $mol_dom_make( id? : string , localName = 'span' ,  namespaceURI = 'http://www.w3.org/1999/xhtml' ) {
		const document = $mol_dom_context.document
		
		let node = id && document.getElementById( id ) as Element
		if( !node ) {
			node = document.createElementNS( namespaceURI , localName )
			if( id ) node.id = id
		}
		
		return node
	}
	
}
