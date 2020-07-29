namespace $ {
	
	export function $mol_dom_render_events (
		el : Element ,
		events : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , events[ name ] , { passive : false } as any )
		}
	}
	
	export function $mol_dom_render_events_async (
		el : Element ,
		events : { [ key : string ] : ( event : Event )=> any }
	) {
		for( let name in events ) {
			el.addEventListener( name , events[ name ] , { passive : true } as any )
		}
	}
	
}
