namespace JSX {
	export interface Element extends HTMLElement {}
	export interface ElementClass { render() : Element }
	export interface IntrinsicElements { [ key : string ] : { [ prop : string ] : any } }
	export interface ElementAttributesProperty { props : {} }
}

namespace $ {

	export function $mol_dom_jsx< Props , Children extends Array< Node | string > >(
		Elem : string | ( ( props : Props , ... children : Children ) => Element ) ,
		props : Props ,
		... children : Children
	) {

		if( typeof Elem !== 'string' ) return Elem( props , ... children )

		const document = $mol_dom_context.document
		const node = document.createElement( Elem )

		for( let child of ( [] as ( Node | string )[] ).concat.call( [] , ... children ) ) {
			if( typeof child === 'string' ) child = document.createTextNode( child )
			node.appendChild( child )
		}

		for( const key in props ) {

			let descr : PropertyDescriptor | undefined
			let proto = node

			while( true ) {

				proto = Object.getPrototypeOf( proto )
				if( !proto ) {
					node.setAttribute( key , String( props[ key ] ) )
					break
				}
				
				descr = Object.getOwnPropertyDescriptor( proto , key )
				if( !descr ) continue

				if( descr.set ) Object.defineProperty( node , key , descr )
				break
			}

			
			node[ key as any ] = props[ key ]
		}

		return node

	}
	
}
