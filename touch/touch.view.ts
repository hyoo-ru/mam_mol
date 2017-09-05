namespace $.$$ {
	export class $mol_touch extends $.$mol_touch {
		
		event_start( event? : TouchEvent ) {
			if( event.defaultPrevented ) return

			if( event.touches.length === 1 ) {
				const pos = [ event.touches[0].pageX , event.touches[0].pageY ]
				this.start_pos( pos )
			}

			if( event.touches.length === 2 ) {
				event.preventDefault()
				
				const distance = ( ( event.touches[1].pageX - event.touches[0].pageX ) ** 2 + ( event.touches[1].pageY - event.touches[0].pageY ) ** 2 ) ** .5
				this.start_distance( distance )
				this.start_zoom( this.zoom() )
			}
		}
		
		event_move( event? : TouchEvent ) {

			if( event.touches.length === 1 ) {
				const start = this.start_pos()
				if( !start ) return
				
				const pos = [ event.touches[0].pageX , event.touches[0].pageY ]
				const precision = this.swipe_precision()
				
				if( pos[0] - start[0] > precision * 2 && Math.abs( pos[1] - start[1] ) < precision ) this.swipe_right( event )
				else if( start[0] - pos[0] > precision * 2 && Math.abs( pos[1] - start[1] ) < precision ) this.swipe_left( event )
				else if( pos[1] - start[1] > precision * 2 && Math.abs( pos[0] - start[0] ) < precision ) this.swipe_bottom( event )
				else if( start[1] - pos[1] > precision * 2 && Math.abs( pos[0] - start[0] ) < precision ) this.swipe_top( event )
				
				else return
				
				this.start_pos( null )
			}
			
			if( event.touches.length === 2 ) {
				const distance = ( ( event.touches[1].pageX - event.touches[0].pageX ) ** 2 + ( event.touches[1].pageY - event.touches[0].pageY ) ** 2 ) ** .5
				this.zoom( this.start_zoom() * distance / this.start_distance() )
			}
		}

		swipe_left( event? : TouchEvent ) {
			if( this.dom_node().getBoundingClientRect().right - this.start_pos()[0] < this.swipe_precision() * 2 ) this.swipe_from_right( event )
			else this.swipe_to_left( event )
		}
		
		swipe_right( event? : TouchEvent ) {
			if( this.start_pos()[0] - this.dom_node().getBoundingClientRect().left < this.swipe_precision() * 2 ) this.swipe_from_left( event )
			else this.swipe_to_right( event )
		}
		
		swipe_top( event? : TouchEvent ) {
			if( this.dom_node().getBoundingClientRect().bottom - this.start_pos()[1] < this.swipe_precision() * 2 ) this.swipe_from_bottom( event )
			else this.swipe_to_top( event )
		}
		
		swipe_bottom( event? : TouchEvent ) {
			if( this.start_pos()[1] - this.dom_node().getBoundingClientRect().top < this.swipe_precision() * 2 ) this.swipe_from_top( event )
			else this.swipe_to_bottom( event )
		}
		
		event_end( event? : TouchEvent ) {
		}
		
	}
}
