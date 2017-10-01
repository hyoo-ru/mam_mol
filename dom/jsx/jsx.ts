namespace JSX {
	export interface Element extends HTMLElement {}
	export interface ElementClass extends Object {}
	export interface IntrinsicElements { [ key : string ] : { [ prop : string ] : any } }
}

namespace $ {
	
	export function $mol_dom_jsx(
		localName : string | Function | { new( props : { [ key : string ] : any } ) : Element } ,
		props : { [ key : string ] : any } ,
		...children : Array< Node | string >
	) {
		let node : Element
		if( typeof localName === 'string' ) {

			node = $mol_dom_make( props && props.id , localName )
			$mol_dom_render_children( node , [].concat.apply( [] , children ) )
			$mol_dom_render_fields( node , props )
			
		} else if( typeof localName === 'function' ) {
			
			node = new ( localName as any )({ childNodes : children , ... props })
			if( node['render'] ) node = node['render']()

		}
		
		return node
	}
	
}
