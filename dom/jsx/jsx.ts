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

	export let $mol_dom_jsx_context = {
		prefix : ''
	}

	export function $mol_dom_jsx< Props extends { id? : string } , Children extends Array< Node | string > >(
		Elem : string | ( ( props : Props , ... children : Children ) => Element ) ,
		props : Props ,
		... children : Children
	) {

		const prefix = $mol_dom_jsx_context.prefix
		const id = prefix
		? ( props && ( props.id !== undefined ) && ( prefix + '.' + props.id ) || prefix || '' )
		: ( props && ( props.id !== undefined ) && props.id || '' )

		if( typeof Elem !== 'string' ) {
			let context = $mol_dom_jsx_context
			try {
				if( id ) $mol_dom_jsx_context = { prefix : id }
				return Elem( props , ... children )
			} finally {
				$mol_dom_jsx_context = context
			}
		}

		const document = $mol_dom_context.document
		const node = id && document.getElementById( id ) || document.createElement( Elem )

		$mol_dom_render_children( node , ( [] as ( Node | string )[] ).concat( ... children ) )

		if( id ) props.id = id

		for( const key in props ) {

			if( typeof props[ key ] === 'string' ) {

				node.setAttribute( key , props[ key as any ] )

			} else if( props[ key ] && props[ key ].constructor === Object ) {

				if( typeof node[ key as any ] === 'object' ) {
					Object.assign( ( node as any )[ key ] , props[ key ] )
					continue
				}

			}

			node[ key as any ] = props[ key ]

		}

		return node

	}
	
}
