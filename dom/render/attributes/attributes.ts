namespace $ {
	
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

}
