namespace $ {
	
	export function $mol_dom_render_events (
		el : Element ,
		events : { [ key : string ] : ( event : Event )=> any },
		passive = false
	) {
		for( let name in events ) {
			el.addEventListener( name , events[ name ] , { passive } )
		}
	}

}
