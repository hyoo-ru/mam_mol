namespace $ {

	export function $mol_jsx_make< Props extends { id? : string } , Children extends Array< Node | string > >(
		Elem : string
			| ( ( props : Props , ... children : Children ) => Element )
			| typeof $mol_jsx_view ,
		props : Props ,
		... childNodes : Children
	) : Element {

		const id = props && props.id || ''

		if( $mol_jsx_booked ) {
			if( $mol_jsx_booked.has( id ) ) {
				$mol_fail( new Error( `JSX already has tag with id ${ JSON.stringify( id ) }` ) )
			} else {
				$mol_jsx_booked.add( id )
			}
		}

		const guid = $mol_jsx_prefix + id

		let node = guid && $mol_jsx_document.getElementById( guid )

		if( typeof Elem !== 'string' ) {

			if( Elem.prototype ) {

				const view : $mol_jsx_view = node && node[ Elem as any ] || new ( Elem as any )
				
				Object.assign( view , props )
				view[ Symbol.toStringTag ] = guid
				
				view.childNodes = childNodes
				
				if( !view.ownerDocument ) view.ownerDocument = $mol_jsx_document
				
				node = view.valueOf()
				
				node[ Elem as any ] = view
				
				return node

			} else {

				const prefix = $mol_jsx_prefix
				const booked = $mol_jsx_booked
				
				try {
	
					$mol_jsx_prefix = guid
					$mol_jsx_booked = new Set
	
					return ( Elem as any )( props , ... childNodes )
					
				} finally {

					$mol_jsx_prefix = prefix
					$mol_jsx_booked = booked
	
				}
				
			}

		}

		if( !node ) node = $mol_jsx_document.createElement( Elem )

		$mol_dom_render_children( node , ( [] as ( Node | string )[] ).concat( ... childNodes ) )

		for( const key in props ) {

			if( typeof props[ key ] === 'string' ) {

				node.setAttribute( key , props[ key as any ] )

			} else if( props[ key ] && props[ key ]['constructor'] === Object ) {

				if( typeof node[ key as any ] === 'object' ) {
					Object.assign( ( node as any )[ key ] , props[ key ] )
					continue
				}

			}

			node[ key as any ] = props[ key ]

		}

		if( guid ) node.id = guid

		return node

	}

}
