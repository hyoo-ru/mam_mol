namespace $.$mol {
	export class $mol_touch extends $.$mol_touch {
		
		dom_node() : Element {
			return $mol_view_dom.mount( this , ( this.object_owner() as $mol_view ).dom_node() )
		}
		
		@ $mol_mem()
		start_distance( next = 0 ) {
			return next
		}
		
		@ $mol_mem()
		start_zoom( next = 0 ) {
			return next
		}
		
		event_start( event? : TouchEvent ) {
			if( event.touches.length !== 2 ) return
			
			event.preventDefault()
			
			const distance = ( ( event.touches[1].screenX - event.touches[0].screenX ) ** 2 + ( event.touches[1].screenY - event.touches[0].screenY ) ** 2 ) ** .5
			this.start_distance( distance )
			this.start_zoom( this.zoom() )
		}
		
		event_move( event? : TouchEvent ) {
			if( event.touches.length !== 2 ) return
			
			const distance = ( ( event.touches[1].screenX - event.touches[0].screenX ) ** 2 + ( event.touches[1].screenY - event.touches[0].screenY ) ** 2 ) ** .5
			this.zoom( this.start_zoom() * distance / this.start_distance() )
		}
		
		event_end( event? : TouchEvent ) {
		}
		
	}
}
