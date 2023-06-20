namespace $ {
	export class $mol_touch extends $mol_plugin {
		
		/**
		 * ```tree
		 * start_zoom? 0
		 * ```
		 */
		@ $mol_mem
		start_zoom(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * start_distance? 0
		 * ```
		 */
		@ $mol_mem
		start_distance(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * zoom? 1
		 * ```
		 */
		@ $mol_mem
		zoom(next?: any) {
			if ( next !== undefined ) return next as never
			return 1
		}
		
		/**
		 * ```tree
		 * allow_draw true
		 * ```
		 */
		allow_draw() {
			return true
		}
		
		/**
		 * ```tree
		 * allow_pan true
		 * ```
		 */
		allow_pan() {
			return true
		}
		
		/**
		 * ```tree
		 * allow_zoom true
		 * ```
		 */
		allow_zoom() {
			return true
		}
		
		/**
		 * ```tree
		 * action_type? \
		 * ```
		 */
		@ $mol_mem
		action_type(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * action_point? $mol_vector_2d /
		 * 	NaN
		 * 	NaN
		 * ```
		 */
		@ $mol_mem
		action_point(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_vector_2d(
				NaN,
				NaN
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * start_pan? /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		start_pan(next?: any) {
			if ( next !== undefined ) return next as never
			return [
				0,
				0
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * pan? $mol_vector_2d /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		pan(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_vector_2d(
				0,
				0
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * pointer_center $mol_vector_2d /
		 * 	NaN
		 * 	NaN
		 * ```
		 */
		@ $mol_mem
		pointer_center() {
			const obj = new this.$.$mol_vector_2d(
				NaN,
				NaN
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * start_pos? null
		 * ```
		 */
		@ $mol_mem
		start_pos(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_precision 16
		 * ```
		 */
		swipe_precision() {
			return 16
		}
		
		/**
		 * ```tree
		 * swipe_right? null
		 * ```
		 */
		@ $mol_mem
		swipe_right(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_bottom? null
		 * ```
		 */
		@ $mol_mem
		swipe_bottom(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_left? null
		 * ```
		 */
		@ $mol_mem
		swipe_left(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_top? null
		 * ```
		 */
		@ $mol_mem
		swipe_top(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_right? null
		 * ```
		 */
		@ $mol_mem
		swipe_from_right(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_bottom? null
		 * ```
		 */
		@ $mol_mem
		swipe_from_bottom(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_left? null
		 * ```
		 */
		@ $mol_mem
		swipe_from_left(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_top? null
		 * ```
		 */
		@ $mol_mem
		swipe_from_top(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_right? null
		 * ```
		 */
		@ $mol_mem
		swipe_to_right(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_bottom? null
		 * ```
		 */
		@ $mol_mem
		swipe_to_bottom(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_left? null
		 * ```
		 */
		@ $mol_mem
		swipe_to_left(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_top? null
		 * ```
		 */
		@ $mol_mem
		swipe_to_top(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * draw_start?event null
		 * ```
		 */
		@ $mol_mem
		draw_start(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * draw?event null
		 * ```
		 */
		@ $mol_mem
		draw(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * draw_end?event null
		 * ```
		 */
		@ $mol_mem
		draw_end(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	touch-action \none
		 * 	overscroll-behavior \none
		 * ```
		 */
		style() {
			return {
				...super.style(),
				"touch-action": "none",
				"overscroll-behavior": "none"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	pointerdown?event <=> event_start?event
		 * 	pointermove?event <=> event_move?event
		 * 	pointerup?event <=> event_end?event
		 * 	pointerleave?event <=> event_leave?event
		 * 	wheel?event <=> event_wheel?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				pointerdown: (event?: any) => this.event_start(event),
				pointermove: (event?: any) => this.event_move(event),
				pointerup: (event?: any) => this.event_end(event),
				pointerleave: (event?: any) => this.event_leave(event),
				wheel: (event?: any) => this.event_wheel(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event_start?event null
		 * ```
		 */
		@ $mol_mem
		event_start(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_move?event null
		 * ```
		 */
		@ $mol_mem
		event_move(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_end?event null
		 * ```
		 */
		@ $mol_mem
		event_end(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_leave?event null
		 * ```
		 */
		@ $mol_mem
		event_leave(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_wheel?event null
		 * ```
		 */
		@ $mol_mem
		event_wheel(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
	}
	
}

