namespace $ {

	export let $mol_jsx_prefix = ''
	export let $mol_jsx_crumbs = ''

	export let $mol_jsx_booked = null as null | Set< string >
	
	export let $mol_jsx_document : $mol_jsx.JSX.ElementClass['ownerDocument'] = {
		getElementById : ()=> null ,
		createElementNS : ( space: string, name : string )=> $mol_dom_context.document.createElementNS( space, name ) as any,
		createDocumentFragment : ()=> $mol_dom_context.document.createDocumentFragment(),
	}
	
	export const $mol_jsx_frag = ''

	/**
	 * JSX adapter that makes DOM tree.
	 * Generates global unique ids for every DOM-element by components tree with ids.
	 * Ensures all local ids are unique.
	 * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
	 */
	export function $mol_jsx<
		Props extends $mol_jsx.JSX.IntrinsicAttributes,
		Children extends Array< Node | string >
	>(
		Elem : string
			| ( ( props : Props , ... children : Children ) => Element ) ,
		props : Props ,
		... childNodes : Children
	) : Element | DocumentFragment {

		const id = props && props.id || ''
		const guid = id ? $mol_jsx_prefix ? $mol_jsx_prefix + '/'+ id : id : $mol_jsx_prefix
		const crumbs_self = id ? $mol_jsx_crumbs.replace( /(\S+)/g, `$1_${ id.replace( /\/.*/i, '' ) }` ) : $mol_jsx_crumbs
		
		if( Elem && $mol_jsx_booked ) {
			if( $mol_jsx_booked.has( id ) ) {
				$mol_fail( new Error( `JSX already has tag with id ${ JSON.stringify( guid ) }` ) )
			} else {
				$mol_jsx_booked.add( id )
			}
		}

		let node: Element | DocumentFragment | null = guid ? $mol_jsx_document.getElementById( guid ) : null

		if( $mol_jsx_prefix ) {
			
			const prefix_ext = $mol_jsx_prefix
			const booked_ext = $mol_jsx_booked
			const crumbs_ext = $mol_jsx_crumbs
			
			for( const field in props ) {
				
				const func = props[ field ]
				if( typeof func !== 'function' ) continue
				
				
				const wrapper = function( this: any, ... args: any[] ) {
					
					const prefix = $mol_jsx_prefix
					const booked = $mol_jsx_booked
					const crumbs = $mol_jsx_crumbs
					
					try {
		
						$mol_jsx_prefix = prefix_ext
						$mol_jsx_booked = booked_ext
						$mol_jsx_crumbs = crumbs_ext
						
						return func.call( this, ... args )
						
					} finally {
						
						$mol_jsx_prefix = prefix
						$mol_jsx_booked = booked
						$mol_jsx_crumbs = crumbs
	
					}
					
				}
				
				$mol_func_name_from( wrapper, func )
				props[ field ] = wrapper as any
				
			}
			
		}

		if( typeof Elem !== 'string' ) {

			if( 'prototype' in Elem ) {

				const view = node && (node as any)[ String(Elem) ] || new ( Elem as any )
				
				Object.assign( view , props )
				view[ Symbol.toStringTag ] = guid
				
				view.childNodes = childNodes
				
				if( !view.ownerDocument ) view.ownerDocument = $mol_jsx_document
				view.className = ( crumbs_self ? crumbs_self + ' ' : '' ) + ( Elem['name'] || Elem )
				
				node = view.valueOf()
				
				;(node as any)![ String(Elem) ] = view
				
				return node!

			} else {

				const prefix = $mol_jsx_prefix
				const booked = $mol_jsx_booked
				const crumbs = $mol_jsx_crumbs
				
				try {
	
					$mol_jsx_prefix = guid
					$mol_jsx_booked = new Set
					$mol_jsx_crumbs = ( crumbs_self ? crumbs_self + ' ' : '' ) + ( Elem['name'] || Elem )
	
					return ( Elem as any )( props , ... childNodes )
					
				} finally {

					$mol_jsx_prefix = prefix
					$mol_jsx_booked = booked
					$mol_jsx_crumbs = crumbs
	
				}
				
			}

		}

		if( !node ) {
			node = Elem
				? $mol_jsx_document.createElementNS( props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem )
				: $mol_jsx_document.createDocumentFragment()
		}

		$mol_dom_render_children( node , ( [] as ( Node | string )[] ).concat( ... childNodes ) )
		if( !Elem ) return node

		if( guid ) ( node as Element ).id = guid
		for( const key in props ) {
			if( key === 'id' ) continue
			
			if( typeof props[ key ] === 'string' ) {
				
				if( typeof (node as any)[ key ] === 'string' ) (node as any)[ key ] = props[ key ]
				;( node as Element ).setAttribute( key , (props as any)[ key ] )
				
			} else if(
				props[ key ] &&
				typeof props[ key ] === 'object' &&
				Reflect.getPrototypeOf( props[ key ] as any ) === Reflect.getPrototypeOf({})
			) {

				if( typeof (node as any)[ key ] === 'object' ) {
					Object.assign( ( node as any )[ key ] , props[ key ] )
					continue
				}

			} else {

				(node as any)[ key ] = props[ key ]
				
			}

		}

		if( $mol_jsx_crumbs ) ( node as Element ).className = ( (props as any)?.['class'] ? (props as any)['class'] + ' ' : '' ) + crumbs_self

		return node

	}

	export declare namespace $mol_jsx.JSX {

		export interface Element extends HTMLElement {
			class?: string
		}
		
		export interface ElementClass {
			attributes : {}
			ownerDocument : Pick< Document , 'getElementById' | 'createElementNS' | 'createDocumentFragment' >
			childNodes : Array< Node | string >
			valueOf() : Element
		}
		
		type OrString< Dict > = {
			[ key in keyof Dict ]: Dict[ key ] | string
		}
		
		/** Props for html elements */
		export type IntrinsicElements = {
			[ key in keyof ElementTagNameMap ]? : $.$mol_type_partial_deep< OrString<
				& Element
				& IntrinsicAttributes
				& ElementTagNameMap[ key ]
			> >
		}
		
		/** Additional undeclared props */
		export interface IntrinsicAttributes {
			id? : string
			xmlns? : string
		}
		
		export interface ElementAttributesProperty {
			attributes : {
			}
		}
		
		// export type IntrinsicClassAttributes< Class > = $.$mol_type_partial_deep< Omit< Class , 'valueOf' > >
		
		interface ElementChildrenAttribute {
		}
	
	}

}
