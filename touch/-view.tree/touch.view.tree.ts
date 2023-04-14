namespace $ {
	export class $mol_touch extends $mol_plugin {
		
		/**
		 * ```tree
		 * start_zoom?val 0
		 * ```
		 */
		@ $mol_mem
		start_zoom(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * start_distance?val 0
		 * ```
		 */
		@ $mol_mem
		start_distance(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * zoom?val 1
		 * ```
		 */
		@ $mol_mem
		zoom(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * action_type?val \
		 * ```
		 */
		@ $mol_mem
		action_type(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * action_point?val $mol_vector_2d /
		 * 	NaN
		 * 	NaN
		 * ```
		 */
		@ $mol_mem
		action_point(val?: any) {
			if ( val !== undefined ) return val as never
			const obj = new this.$.$mol_vector_2d(
				NaN,
				NaN
			)
			
			return obj
		}
		
		/**
		 * ```tree
		 * start_pan?val /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		start_pan(val?: any) {
			if ( val !== undefined ) return val as never
			return [
				0,
				0
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * pan?val $mol_vector_2d /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		pan(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * start_pos?val null
		 * ```
		 */
		@ $mol_mem
		start_pos(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * swipe_right?val null
		 * ```
		 */
		@ $mol_mem
		swipe_right(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_bottom(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_left(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_top(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_right?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_right(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_bottom(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_left(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_from_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_top(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_right?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_right(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_bottom(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_left(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * swipe_to_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_top(val?: any) {
			if ( val !== undefined ) return val as never
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

