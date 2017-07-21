namespace $.$mol {
	export class $mol_touch extends $.$mol_touch {
		
		dom_node() : Element {
			return $mol_view_dom.mount( this , ( this.object_owner() as $mol_view ).dom_node() )
		}
		
		event_start( event? : TouchEvent ) {

			if( event.touches.length === 1 ) {
				const pos = [ event.touches[0].screenX , event.touches[0].screenY ]
				this.start_pos( pos )
			}

			if( event.touches.length === 2 ) {
				event.preventDefault()
				
				const distance = ( ( event.touches[1].screenX - event.touches[0].screenX ) ** 2 + ( event.touches[1].screenY - event.touches[0].screenY ) ** 2 ) ** .5
				this.start_distance( distance )
				this.start_zoom( this.zoom() )
			}
		}
		
		event_move( event? : TouchEvent ) {

			if( event.touches.length === 1 ) {
				const start = this.start_pos()
				if( !start ) return
				
				const pos = [ event.touches[0].screenX , event.touches[0].screenY ]
				const precision = this.swipe_precision()
				
				if( pos[0] - start[0] > precision * 2 && Math.abs( pos[1] - start[1] ) < precision ) this.swipe_right( event )
				else if( start[0] - pos[0] > precision * 2 && Math.abs( pos[1] - start[1] ) < precision ) this.swipe_left( event )
				else if( pos[1] - start[1] > precision * 2 && Math.abs( pos[0] - start[0] ) < precision ) this.swipe_bottom( event )
				else if( start[1] - pos[1] > precision * 2 && Math.abs( pos[0] - start[0] ) < precision ) this.swipe_top( event )
				else return
				
				this.start_pos( null )
			}
			
			if( event.touches.length === 2 ) {
				const distance = ( ( event.touches[1].screenX - event.touches[0].screenX ) ** 2 + ( event.touches[1].screenY - event.touches[0].screenY ) ** 2 ) ** .5
				this.zoom( this.start_zoom() * distance / this.start_distance() )
			}
		}
		
		event_end( event? : TouchEvent ) {
		}
		
	}
}
