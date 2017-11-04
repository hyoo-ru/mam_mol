namespace $.$$ {
	export class $mol_touch extends $.$mol_touch {
		
		event_start( event? : TouchEvent ) {
			if( event.defaultPrevented ) return

			this.start_pan( this.pan() )

			if( event.touches.length === 1 ) {
				const pos = [ event.touches[0].pageX , event.touches[0].pageY ]
				this.start_pos( pos )
			}

			if( event.touches.length === 2 ) {
				const distance = ( ( event.touches[1].pageX - event.touches[0].pageX ) ** 2 + ( event.touches[1].pageY - event.touches[0].pageY ) ** 2 ) ** .5
				this.start_distance( distance )
				this.start_zoom( this.zoom() )
			}
		}
		
		event_move( event? : TouchEvent ) {
			if( event.defaultPrevented ) return
			event.preventDefault()

			const start_pan = this.start_pan()

			if( event.touches.length === 1 ) {
				const start_pos = this.start_pos()
				if( !start_pos ) return
				
				const pos = [ event.touches[0].pageX , event.touches[0].pageY ]
				const precision = this.swipe_precision()

				this.pan([ start_pan[0] + pos[0] - start_pos[0] , start_pan[1] + pos[1] - start_pos[1] ])
				
				if( pos[0] - start_pos[0] > precision * 2 && Math.abs( pos[1] - start_pos[1] ) < precision ) this.swipe_right( event )
				else if( start_pos[0] - pos[0] > precision * 2 && Math.abs( pos[1] - start_pos[1] ) < precision ) this.swipe_left( event )
				else if( pos[1] - start_pos[1] > precision * 2 && Math.abs( pos[0] - start_pos[0] ) < precision ) this.swipe_bottom( event )
				else if( start_pos[1] - pos[1] > precision * 2 && Math.abs( pos[0] - start_pos[0] ) < precision ) this.swipe_top( event )
				
				else return
			}
			
			if( event.touches.length === 2 ) {
				const pos0 = [ event.touches[0].pageX , event.touches[0].pageY ]
				const pos1 = [ event.touches[1].pageX , event.touches[1].pageY ]

				const distance = ( ( pos1[0] - pos0[0] ) ** 2 + ( pos1[1] - pos0[1] ) ** 2 ) ** .5
				const center = [ pos1[0] / 2 + pos0[0] / 2 , pos1[1] / 2 + pos0[1] / 2 ]

				const start_zoom = this.start_zoom()
				const mult = distance / this.start_distance()
				this.zoom( start_zoom * mult )

				const pan = [ ( start_pan[0] - center[0] ) * mult + center[0] , ( start_pan[1] - center[1] ) * mult + center[1] ]

				this.pan( pan )
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
			this.start_pos( null )
		}

		event_wheel( event? : WheelEvent ) {
			const zoom_prev = this.zoom()
			const zoom_next = zoom_prev * ( 1 + .1 * Math.sign( event.wheelDelta ) )
			const mult = zoom_next / zoom_prev
			this.zoom( zoom_next )

			const pan_prev = this.pan()
			const center = [ event.offsetX , event.offsetY ]
			const pan_next = [ ( pan_prev[0] - center[0] ) * mult + center[0] , ( pan_prev[1] - center[1] ) * mult + center[1] ]

			this.pan( pan_next )
		}
		
	}
}
