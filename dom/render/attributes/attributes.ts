namespace $ {
	
	export function $mol_dom_render_attributes (
		el : Element ,
		attrs : { [ key : string ] : string|number|boolean|null }
	) {

		for( let name in attrs ) {

			let val = attrs[ name ] as any

			if( val === undefined ) {
				
				continue
				
			} if( val === null || val === false ) {

				if( !el.hasAttribute( name ) ) continue
				
				el.removeAttribute( name )

			} else {
				
				const  str = String( val )
				if( el.getAttribute( name ) === str ) continue
				
				el.setAttribute( name , str )

			}

		}

	}

}
