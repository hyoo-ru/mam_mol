namespace $ {
	
	export function $mol_dom_patch( target : Node | null , source : Node ) {
		
		if( target == null ) return source.cloneNode( true )
		if( target.nodeName !== source.nodeName ) target = source.cloneNode( false )

		switch( source.nodeType ) {
		
			case $mol_dom_context.Node.TEXT_NODE :
			
				if( target.nodeValue !== source.nodeValue ) target.nodeValue = source.nodeValue
				return target

			case $mol_dom_context.Node.ELEMENT_NODE :

				let overflow = - ( source as Element ).childNodes.length
				let next = ( target as Element ).firstChild as Node
				for( let child of ( source as Element ).childNodes ) {
					child = $mol_dom_patch( next , child ) as ChildNode
					if( next === child ) next = next.nextSibling!
					else target.insertBefore( child , next )
				}

				overflow += ( target as Element ).childNodes.length
				for( let i = 0 ; i < overflow ; ++ i ) {
					target.removeChild( target.lastChild! )
				}

				for( let key of Object.getOwnPropertyNames( source ) ) {
					target[ key ] = source[ key ]
				}

				for( const attr of ( target as Element ).attributes ) {
					if( ( source as Element ).hasAttribute( attr.nodeName ) ) continue
					;( target as Element ).removeAttribute( attr.nodeName )
				}
				
				for( const attr of ( source as Element ).attributes ) {
					;( target as Element ).setAttribute( attr.nodeName , attr.nodeValue! )
				}
				
				return target
			
			default : throw new Error( `Unsupported node type ${ source.nodeType }` )

		}

	}

}
