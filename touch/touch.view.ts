namespace $.$$ {

	/**
	 * Plugin for touch gestures.
	 * @see [mol_plugin](../plugin/readme.md)
	 */
	export class $mol_touch extends $.$mol_touch {
		
		auto() {
			this.pointer_events()
			this.start_pan()
			this.start_pos()
			this.start_distance()
			this.start_zoom()
			this.action_type()
			this.view_rect()
		}
		
		@ $mol_mem
		pointer_events( next = [] as readonly PointerEvent[] ) {
			return next
		}
		
		@ $mol_mem
		pointer_coords() {
			
			const events = this.pointer_events()
			const touches = events.filter( e => e.pointerType === 'touch' )
			const pens = events.filter( e => e.pointerType === 'pen' )
			const mouses = events.filter( e => !e.pointerType || e.pointerType === 'mouse' )
			const choosen = touches.length ? touches : pens.length ? pens : mouses
			
			return new $mol_vector(
				... choosen.map( event => this.event_coords( event ) )
			)
			
		}
		
		@ $mol_mem
		pointer_center() {
			const coords = this.pointer_coords()
			return coords.length ? coords.center() : new $mol_vector_2d( NaN , NaN )
		}
		
		event_coords( event: PointerEvent | WheelEvent ) {
			
			const { left, top } = this.view_rect()!
			
			return new $mol_vector_2d(
				Math.round( event.pageX - left ),
				Math.round( event.pageY - top ),
			)
			
		}
		
		@ $mol_mem
		action_point() {
			
			const coord = this.pointer_center()
			if( !coord ) return null!
			
			const zoom = this.zoom()
			const pan = this.pan()
			
			return new $mol_vector_2d(
				( coord.x - pan.x ) / zoom,
				( coord.y - pan.y ) / zoom,
			)
			
		}
		
		event_eat( event: PointerEvent | WheelEvent ) {
			
			if( event instanceof PointerEvent ) {

				const events = this.pointer_events()
					.filter( e => e instanceof PointerEvent )
					.filter( e => e.pointerId !== event.pointerId )
				if( event.type !== 'pointerup' && event.type !== 'pointerleave' ) events.push( event )
				this.pointer_events( events )
				
				const touch_count = events.filter( e => e.pointerType === 'touch' ).length
				
				if( this.allow_zoom() && touch_count === 2 ) {
					return this.action_type( 'zoom' )
				}
				
				if( this.action_type() === 'zoom' && touch_count === 1 ) {
					return this.action_type( 'zoom' )
				}
				
				enum button {
					left = 1,
					right = 2,
					middle = 4,
				}
				
				if( events.length > 0 ) {
					if( event.ctrlKey && this.allow_zoom() ) return this.action_type( 'zoom' )
					if( event.buttons === button.left && this.allow_draw() ) return this.action_type( 'draw' )
					if( event.buttons && this.allow_pan() ) return this.action_type( 'pan' )
				}
				
				return this.action_type( '' )
				
			}
			
			if( event instanceof WheelEvent ) {
				this.pointer_events([ event as any ])
				if( event.shiftKey ) return this.action_type( 'pan' )
				return this.action_type( 'zoom' )
			}
			
			return this.action_type( '' )
		}
		
		event_start( event : PointerEvent ) {
			if( event.defaultPrevented ) return
			
			this.start_pan( this.pan() )

			const action_type = this.event_eat( event )
			if( !action_type ) return
			
			const coords = this.pointer_coords()
			this.start_pos( coords.center() )
			
			if( action_type === 'draw' ) {
				this.draw_start( event )
				return
			}

			this.start_distance( coords.distance() )
			this.start_zoom( this.zoom() )

		}

		event_move( event : PointerEvent ) {
			if( event.defaultPrevented ) return

			const rect = this.view_rect()
			if( !rect ) return
	
			const start_pan = this.start_pan()

			const action_type = this.event_eat( event )
			
			const start_pos = this.start_pos()
			let pos = this.pointer_center()!

			if( !action_type ) return
			if( !start_pos ) return
			
			if( action_type === 'draw' ) {
				
				const distance = new $mol_vector( start_pos, pos ).distance()
				if( distance >= 4 ) {
					this.draw( event )
				}
				return
			}
				
			if( action_type === 'pan' ) {

				this.dom_node().setPointerCapture( event.pointerId )
				
				this.pan(
					new $mol_vector_2d(
						start_pan[0] + pos[0] - start_pos[0],
						start_pan[1] + pos[1] - start_pos[1],
					)
				)
				
			}

			const precision = this.swipe_precision()
			
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
			}

			if( action_type === 'zoom' ) {

				const coords = this.pointer_coords()
				const distance = coords.distance()
				const start_distance = this.start_distance()
				const center = coords.center()

				const start_zoom = this.start_zoom()
				let mult = Math.abs( distance - start_distance ) < 32 ? 1 : distance / start_distance
				this.zoom( start_zoom * mult )

				const pan = new $mol_vector_2d(
					( start_pan[0] - center[0] + pos[0] - start_pos[0] ) * mult + center[0],
					( start_pan[1] - center[1] + pos[1] - start_pos[1] ) * mult + center[1],
				)

				this.pan( pan )

			}
			
		}

		event_end( event : PointerEvent ) {
			
			const action = this.action_type()
			if( action ==='draw' ) {
				this.draw_end( event )
			}
			
			this.event_leave( event )
			
		}

		event_leave( event : PointerEvent ) {

			this.event_eat( event )
			this.dom_node().releasePointerCapture( event.pointerId )
			this.start_pos( null )
			
		}

		swipe_left( event : PointerEvent ) {
			if( this.view_rect()!.right - this.start_pos()[0] < this.swipe_precision() * 2 ) this.swipe_from_right( event )
			else this.swipe_to_left( event )
			this.event_end( event )
		}
		
		swipe_right( event : PointerEvent ) {
			if( this.start_pos()[0] - this.view_rect()!.left < this.swipe_precision() * 2 ) this.swipe_from_left( event )
			else this.swipe_to_right( event )
			this.event_end( event )
		}
		
		swipe_top( event : PointerEvent ) {
			if( this.view_rect()!.bottom - this.start_pos()[1] < this.swipe_precision() * 2 ) this.swipe_from_bottom( event )
			else this.swipe_to_top( event )
			this.event_end( event )
		}
		
		swipe_bottom( event : PointerEvent ) {
			if( this.start_pos()[1] - this.view_rect()!.top < this.swipe_precision() * 2 ) this.swipe_from_top( event )
			else this.swipe_to_bottom( event )
			this.event_end( event )
		}
		
		event_wheel( event : WheelEvent ) {
			
			if( event.defaultPrevented ) return

			if( this.pan === $mol_touch.prototype.pan && this.zoom === $mol_touch.prototype.zoom ) return
			
			if( this.pan !== $mol_touch.prototype.pan ) {
				event.preventDefault()
			}
			
			const action_type = this.event_eat( event )

			if( action_type === 'zoom' ) {
				
				const zoom_prev = this.zoom() || 0.001
				let zoom_next = zoom_prev * ( 1 - .001 * Math.min( event.deltaY, 100 ) )
				zoom_next = this.zoom( zoom_next )
				const mult = zoom_next / zoom_prev

				const pan_prev = this.pan()
				const center = this.pointer_center()!
				const pan_next = pan_prev.multed0( mult ).added1( center.multed0( 1 - mult ) )

				this.pan( pan_next )
			}
			
			if( action_type === 'pan' ) {
				
				const pan_prev = this.pan()
				const pan_next = new $mol_vector_2d(
					pan_prev.x - event.deltaX,
					pan_prev.y - event.deltaY,
				)

				this.pan( pan_next )
			}
			
		}
		
	}
	
}
