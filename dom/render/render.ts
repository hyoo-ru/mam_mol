namespace $ {
	
	export function $mol_dom_render_fields (
		el : Element ,
		fields : { [ key : string ] : any }
	) {
		for( let key in fields ) {
			
			const val : any = fields[ key ]
			
			if( val === undefined ) continue
			if( el[ key ] === val ) continue
			
			el[ key ] = val
		}
	}
	
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
		
		let nextNode = el.firstChild
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
	
	export function $mol_dom_render_attributes (
		el : Element ,
		attrs : { [ key : string ] : string|number|boolean }
	) {
		for( let name in attrs ) {
			let val = attrs[ name ] as any
			if( val === null || val === false ) el.removeAttribute( name )
			else el.setAttribute( name , String( val ) )
		}
	}
	
	export function $mol_dom_render_styles (
		el : Element ,
		styles : { [ key : string ] : string|number }
	) {
		for( let name in styles ) {
			let val = styles[ name ]
			
			const style = ( el as HTMLElement ).style as any
			const cur = style[ name ]
			
			if( typeof val === 'number' ) {
				if( parseFloat( cur ) == val ) continue
				style[ name ] = `${ val }px`
			}
			
			if( cur !== val ) style[ name ] = val
		}
	}
	
	export function $mol_dom_render_events (
		el : Element ,
		events : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , $mol_log_group( el.id + ' ' + name , events[ name ] ) , { passive : false } as any )
		}
	}
	
	export function $mol_dom_render_events_async (
		el : Element ,
		events : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , $mol_log_group( el.id + ' ' + name , events[ name ] ) , { passive : true } as any )
		}
	}
	
}
