namespace JSX {

	type DeepPartial< Val > = {
		[ field in keyof Val ]? : DeepPartial< Val[ field ] >
	}
	
	export interface Element extends HTMLElement {}
	
	export interface ElementClass { render() : Element }
	
	export type IntrinsicElements = {
		[ key in keyof HTMLElementTagNameMap ]? : DeepPartial< HTMLElementTagNameMap[ key ] >
	}
	
	export interface ElementAttributesProperty { props : {} }

}

namespace $ {

	export let $mol_dom_jsx_prefix = ''

	export let $mol_dom_jsx_booked = null as null | Set< string >
	
	export let $mol_dom_jsx_document : Pick< Document , 'getElementById' | 'createElement' > = {
		getElementById : ()=> null ,
		createElement : ( name : string )=> $mol_dom_context.document.createElement( name )
	}

	export function $mol_dom_jsx_attach< Result >( next : typeof $mol_dom_jsx_document , action : ()=> Result ) {
		const prev = $mol_dom_jsx_document
		try {
			$mol_dom_jsx_document = next
			return action()
		} finally {
			$mol_dom_jsx_document = prev
		}
	}

	export function $mol_dom_jsx< Props extends { id? : string } , Children extends Array< Node | string > >(
		Elem : string | ( ( props : Props , ... children : Children ) => Element ) ,
		props : Props ,
		... children : Children
	) {

		const id = props && props.id || ''

		if( $mol_dom_jsx_booked ) {
			if( $mol_dom_jsx_booked.has( id ) ) {
				$mol_fail( new Error( `JSX already has tag with id ${ JSON.stringify( id ) }` ) )
			} else {
				$mol_dom_jsx_booked.add( id )
			}
		}

		const guid = id ? $mol_dom_jsx_prefix ? $mol_dom_jsx_prefix + '.' + id : id : $mol_dom_jsx_prefix

		if( typeof Elem !== 'string' ) {
			const prefix = $mol_dom_jsx_prefix
			const booked = $mol_dom_jsx_booked
			try {
				$mol_dom_jsx_prefix = guid
				$mol_dom_jsx_booked = new Set
				return Elem( props , ... children )
			} finally {
				$mol_dom_jsx_prefix = prefix
				$mol_dom_jsx_booked = booked
			}
		}

		const node = guid && $mol_dom_jsx_document.getElementById( guid ) || $mol_dom_jsx_document.createElement( Elem )

		$mol_dom_render_children( node , ( [] as ( Node | string )[] ).concat( ... children ) )

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
