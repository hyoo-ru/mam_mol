namespace $.$$ {
	export class $mol_touch extends $.$mol_touch {
		
		event_start( event? : TouchEvent | MouseEvent ) {
			if( event.defaultPrevented ) return

			this.start_pan( this.pan() )

			if( event instanceof TouchEvent ) {

				if( event.touches.length === 1 ) {
					const pos = [ event.touches[0].pageX , event.touches[0].pageY ]
					this.start_pos( pos )
				}

				if( event.touches.length === 2 ) {
					const distance = ( ( event.touches[1].pageX - event.touches[0].pageX ) ** 2 + ( event.touches[1].pageY - event.touches[0].pageY ) ** 2 ) ** .5
					this.start_distance( distance )
					this.start_zoom( this.zoom() )
				}

			} else if( event instanceof MouseEvent ) {

				if( event.buttons === 1 ) {
					const pos = [ event.pageX , event.pageY ]
					this.start_pos( pos )
				}

			}

		}
		
		event_move( event? : TouchEvent | MouseEvent ) {
			if( event.defaultPrevented ) return

			const start_pan = this.start_pan()

			let pos
			if( event instanceof MouseEvent ) {
				if( event.buttons === 1 ) pos = [ event.pageX , event.pageY ]
				else this.start_pos( null )
			}
			if( event instanceof TouchEvent ) {
				if( event.touches.length === 1 ) pos = [ event.touches[0].pageX , event.touches[0].pageY ]
				else this.start_pos( null )
			}

			if( pos ) {

				const start_pos = this.start_pos()
				if( !start_pos ) return
				
				const precision = this.swipe_precision()

				if( this.pan !== $mol_touch.prototype.pan ) {
					this.pan([ start_pan[0] + pos[0] - start_pos[0] , start_pan[1] + pos[1] - start_pos[1] ])
					event.preventDefault()
				}
				
				if(
					(
						this.swipe_right !== $mol_touch.prototype.swipe_right
						|| this.swipe_from_left !== $mol_touch.prototype.swipe_from_left
						|| this.swipe_to_right !== $mol_touch.prototype.swipe_to_right
					)
					&& pos[0] - start_pos[0] > precision * 2
					&& Math.abs( pos[1] - start_pos[1] ) < precision
				) {
					this.swipe_right( event )
					event.preventDefault()
				}

				if(
					(
						this.swipe_left !== $mol_touch.prototype.swipe_left
						|| this.swipe_from_right !== $mol_touch.prototype.swipe_from_right
						|| this.swipe_to_left !== $mol_touch.prototype.swipe_to_left
					)
					&& start_pos[0] - pos[0] > precision * 2
					&& Math.abs( pos[1] - start_pos[1] ) < precision
				) {
					this.swipe_left( event )
					event.preventDefault()
				}

				if(
					(
						this.swipe_bottom !== $mol_touch.prototype.swipe_bottom
						|| this.swipe_from_top !== $mol_touch.prototype.swipe_from_top
						|| this.swipe_to_bottom !== $mol_touch.prototype.swipe_to_bottom
					)
					&& pos[1] - start_pos[1] > precision * 2
					&& Math.abs( pos[0] - start_pos[0] ) < precision
				) {
					this.swipe_bottom( event )
					event.preventDefault()
				}

				if(
					(
						this.swipe_top !== $mol_touch.prototype.swipe_top
						|| this.swipe_from_bottom !== $mol_touch.prototype.swipe_from_bottom
						|| this.swipe_to_top !== $mol_touch.prototype.swipe_to_top
					)
					&& start_pos[1] - pos[1] > precision * 2
					&& Math.abs( pos[0] - start_pos[0] ) < precision
				) {
					this.swipe_top( event )
					event.preventDefault()
				}

			}
			
			if( event instanceof TouchEvent && event.touches.length === 2 ) {

				if( this.zoom === $mol_touch.prototype.zoom ) return

				const pos0 = [ event.touches[0].pageX , event.touches[0].pageY ]
				const pos1 = [ event.touches[1].pageX , event.touches[1].pageY ]

				const distance = ( ( pos1[0] - pos0[0] ) ** 2 + ( pos1[1] - pos0[1] ) ** 2 ) ** .5
				const center = [ pos1[0] / 2 + pos0[0] / 2 , pos1[1] / 2 + pos0[1] / 2 ]

				const start_zoom = this.start_zoom()
				const mult = distance / this.start_distance()
				this.zoom( start_zoom * mult )

				const pan = [ ( start_pan[0] - center[0] ) * mult + center[0] , ( start_pan[1] - center[1] ) * mult + center[1] ]

				this.pan( pan )

				event.preventDefault()
			}
		}

		swipe_left( event? : TouchEvent | MouseEvent ) {
			if( this.dom_node().getBoundingClientRect().right - this.start_pos()[0] < this.swipe_precision() * 2 ) this.swipe_from_right( event )
			else this.swipe_to_left( event )
		}
		
		swipe_right( event? : TouchEvent | MouseEvent ) {
			if( this.start_pos()[0] - this.dom_node().getBoundingClientRect().left < this.swipe_precision() * 2 ) this.swipe_from_left( event )
			else this.swipe_to_right( event )
		}
		
		swipe_top( event? : TouchEvent | MouseEvent ) {
			if( this.dom_node().getBoundingClientRect().bottom - this.start_pos()[1] < this.swipe_precision() * 2 ) this.swipe_from_bottom( event )
			else this.swipe_to_top( event )
		}
		
		swipe_bottom( event? : TouchEvent | MouseEvent ) {
			if( this.start_pos()[1] - this.dom_node().getBoundingClientRect().top < this.swipe_precision() * 2 ) this.swipe_from_top( event )
			else this.swipe_to_bottom( event )
		}
		
		event_end( event? : TouchEvent ) {
			this.start_pos( null )
		}

		event_wheel( event? : WheelEvent ) {
			const zoom_prev = this.zoom()
			const zoom_next = zoom_prev * ( 1 - .1 * Math.sign( event.deltaY ) )
			const mult = zoom_next / zoom_prev
			this.zoom( zoom_next )

			const pan_prev = this.pan()
			const center = [ event.layerX , event.layerY ]
			const pan_next = [ ( pan_prev[0] - center[0] ) * mult + center[0] , ( pan_prev[1] - center[1] ) * mult + center[1] ]

			this.pan( pan_next )
		}
		
	}
}
