namespace $.$$ {

	export class $mol_touch extends $.$mol_touch {
		
		auto() {
			this.view_rect()
		}
		
		event_coords( event: TouchEvent | PointerEvent | WheelEvent ) {
			
			const {left, top} = this.view_rect()!
			
			function point( point: { pageX: number, pageY: number } ) {
				return new $mol_vector_2d(
					Math.round( point.pageX - left ),
					Math.round( point.pageY - top ),
				)
			}
			
			if( 'touches' in event ) {
				return new $mol_vector(
					... [ ... event.touches ].map( point )
				)
			}
			
			return new $mol_vector( point( event ) )
			
		}
		
		action_type( event: TouchEvent | PointerEvent | WheelEvent ) {
			
			if( event instanceof TouchEvent ) {
				if( event.touches.length === 2 ) return 'zoom'
				if( event.touches.length === 1 ) return 'draw'
			}
			
			if( event instanceof PointerEvent ) {
				if( event.pointerType === 'touch' ) return null
				if( event.ctrlKey ) return 'zoom'
				if( event.buttons === 2 ) return 'pan'
				if( event.buttons === 1 ) return 'draw'
			}
			
			if( event instanceof WheelEvent ) {
				if( event.ctrlKey ) return 'zoom'
				return 'pan'
			}
			
			return null
		}
		
		event_start( event : TouchEvent | PointerEvent ) {
			if( event.defaultPrevented ) return
			
			this.start_pan( this.pan() )

			const action_type = this.action_type( event )
			if( !action_type ) return
			if( action_type === 'draw' ) {
				this.draw_start( event )
				return
			}

			const coords = this.event_coords( event )
			this.start_pos( coords.center() )
			this.start_distance( coords.distance() )
			this.start_zoom( this.zoom() )

		}

		event_leave( event : TouchEvent | PointerEvent ) {
			if( event.defaultPrevented ) return
			if( event instanceof PointerEvent ) this.pos(super.pos())
		}
		
		event_move( event : TouchEvent | PointerEvent ) {
			if( event.defaultPrevented ) return

			const rect = this.view_rect()
			if( !rect ) return
	
			const start_pan = this.start_pan()

			let pos!: $mol_vector_2d< number >
			let cursor_pos!: $mol_vector_2d< number >
			
			cursor_pos = this.event_coords( event ).center()
			pos = cursor_pos
			
			const action_type = this.action_type( event )
			
			if (cursor_pos) {
				
				this.pos([
					Math.max(0, cursor_pos[0]),
					Math.max(0, cursor_pos[1]),
				])
				
			}

			if( !action_type ) return
			if( action_type === 'draw' ) {
				this.draw_continue( event )
				return
			}
			
			const start_pos = this.start_pos()
			if( pos ) {
				if( !start_pos ) return

				const distance = new $mol_vector_2d( start_pos, pos ).distance()
				if( distance >= 4 ) {
					
					this._menu_mute = true
					
					if( event instanceof PointerEvent ) {
						this.dom_node().setPointerCapture( event.pointerId )
					}

				}
				
				if( this.pan !== $mol_touch.prototype.pan ) {
					this.pan(
						new $mol_vector_2d(
							start_pan[0] + pos[0] - start_pos[0],
							start_pan[1] + pos[1] - start_pos[1],
						)
					)
					event.preventDefault()
				}

				if( typeof TouchEvent === 'undefined' ) return
				if(!( event instanceof TouchEvent )) return
	
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
			
			if( typeof TouchEvent === 'undefined' ) return
			if(!( event instanceof TouchEvent )) return

			if( event.touches.length === 2 ) {

				if( this.zoom === $mol_touch.prototype.zoom ) return
				
				const coords = this.event_coords( event )
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

				event.preventDefault()
			}
			
		}

		event_end( event : TouchEvent | PointerEvent ) {
			if( !this.start_pos() ) {
				this.draw_end( event )
				return
			}
			if( event instanceof PointerEvent ) {
				this.dom_node().releasePointerCapture( event.pointerId )
			}
			this.start_pos( null )
			new $mol_after_timeout( 0, ()=> this._menu_mute = false )
		}

		swipe_left( event : TouchEvent | PointerEvent ) {
			if( this.view_rect()!.right - this.start_pos()[0] < this.swipe_precision() * 2 ) this.swipe_from_right( event )
			else this.swipe_to_left( event )
			this.event_end( event )
		}
		
		swipe_right( event : TouchEvent | PointerEvent ) {
			if( this.start_pos()[0] - this.view_rect()!.left < this.swipe_precision() * 2 ) this.swipe_from_left( event )
			else this.swipe_to_right( event )
			this.event_end( event )
		}
		
		swipe_top( event : TouchEvent | PointerEvent ) {
			if( this.view_rect()!.bottom - this.start_pos()[1] < this.swipe_precision() * 2 ) this.swipe_from_bottom( event )
			else this.swipe_to_top( event )
			this.event_end( event )
		}
		
		swipe_bottom( event : TouchEvent | PointerEvent ) {
			if( this.start_pos()[1] - this.view_rect()!.top < this.swipe_precision() * 2 ) this.swipe_from_top( event )
			else this.swipe_to_bottom( event )
			this.event_end( event )
		}
		
		_menu_mute = false
		event_menu( event : PointerEvent ) {
			if( this._menu_mute ) event.preventDefault()
		}

		event_wheel( event : WheelEvent ) {

			if( this.pan === $mol_touch.prototype.pan && this.zoom === $mol_touch.prototype.zoom ) return
			
			if( this.pan !== $mol_touch.prototype.pan ) {
				event.preventDefault()
			}
			
			const action_type = this.action_type( event )

			if( action_type === 'zoom' ) {
				
				const zoom_prev = this.zoom() || 0.001
				const zoom_next = zoom_prev * ( 1 - .1 * Math.sign( event.deltaY ) )
				const mult = zoom_next / zoom_prev
				this.zoom( zoom_next )

				const pan_prev = this.pan()
				const center = this.event_coords( event ).center()
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
		
		draw_point( event : TouchEvent | PointerEvent ) {
			const point = this.event_coords( event ).center()
			const zoom = this.zoom()
			const pan = this.pan()
			return new $mol_vector_2d(
				( point.x - pan.x ) / zoom,
				( point.y - pan.y ) / zoom,
			)
		}
		
		draw_start( event : TouchEvent | PointerEvent ) {
			
			const point = this.draw_point( event )
			
			this.drawn(
				new $mol_vector_2d(
					[ point.x ],
					[ point.y ],
				)
			)
			
		}
		
		draw_continue( event : TouchEvent | PointerEvent ) {
			
			const drawn = this.drawn()
			const point = this.draw_point( event )
			
			const last_x = drawn.x[ drawn.x.length - 1 ]
			const last_y = drawn.y[ drawn.x.length - 1 ]
			
			if( last_x === point.x && last_x === point.y ) return
			
			this.drawn(
				new $mol_vector_2d(
					[ ... drawn.x, point.x ],
					[ ... drawn.y, point.y ],
				)
			)
			
		}

		draw_end( event : TouchEvent | PointerEvent ) {
			this.drawn(
				new $mol_vector_2d(
					[],
					[],
				)
			)
		}
		
	}
	
}
