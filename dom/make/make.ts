namespace $ {
	
	export interface $mol_dom_make_config {
		[ key : string ] : any
		id : string
		tagName? : string
		namespaceURI? : string
		childNodes? : NodeList | Array< Node | string | $mol_dom_make_config >
	}
	
	export function $mol_dom_make< tagName extends string >( config : $mol_dom_make_config ) {
		const tag = config.tagName || 'div'
		const ns = config.namespaceURI || 'http://www.w3.org/1999/xhtml'
		const el : HTMLElement = document.getElementById( config.id ) || document.createElementNS( ns , tag ) as HTMLElement
		
		for( let key in config ) {
			switch( key ) {
				case 'tagName' :
				case 'namespaceURI' :
					break 
				case 'childNodes' :
					let i = 0
					while( true ) {
						
						if( i >= config.childNodes.length ) {
							for( let child ; child = el.childNodes[ i ] ; ) {
								el.removeChild( child )
							}
							break
						}
						
						if( i >= el.childNodes.length ) {
							for( ; i < config.childNodes.length ; ++ i ) {
								const child = config.childNodes[ i ]
								if( typeof child === 'string' ) {
									el.appendChild( document.createTextNode( child ) )
								} else {
									el.appendChild( child instanceof Node ? child : $mol_dom_make( child ) )
								}
							}
							break
						}
						
						let childNext = config.childNodes[ i ]
						if( typeof childNext === 'string' ) {
							childNext = document.createTextNode( childNext )
						} else if(!( childNext instanceof Node )) {
							childNext = $mol_dom_make( childNext )
						}
						
						let childPrev = el.childNodes[ i ] || null
						if( childNext !== childPrev ) {
							el.insertBefore( childNext as Node , childPrev )
						}
						
						++i
					}
					break
				default :
					( el as any )[ key ] = config[ key ]
			}
		}
		
		return el
	}

}
