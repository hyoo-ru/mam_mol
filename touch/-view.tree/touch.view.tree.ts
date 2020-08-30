namespace $ {
	export class $mol_touch extends $mol_plugin {

		/**
		 * ```tree
		 * start_zoom?val 0
		 * ```
		 */
		@ $mol_mem
		start_zoom(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * start_distance?val 0
		 * ```
		 */
		@ $mol_mem
		start_distance(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * zoom?val 1
		 * ```
		 */
		@ $mol_mem
		zoom(val?: any) {
			if ( val !== undefined ) return val
			return 1
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
			if ( val !== undefined ) return val
			return [
				0,
				0
			] as readonly any[]
		}

		/**
		 * ```tree
		 * pan?val /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		pan(val?: any) {
			if ( val !== undefined ) return val
			return [
				0,
				0
			] as readonly any[]
		}

		/**
		 * ```tree
		 * pos?val /
		 * 	NaN
		 * 	NaN
		 * ```
		 */
		@ $mol_mem
		pos(val?: any) {
			if ( val !== undefined ) return val
			return [
				NaN,
				NaN
			] as readonly any[]
		}


		/**
		 * ```tree
		 * start_pos?val null
		 * ```
		 */
		@ $mol_mem
		start_pos(val?: any) {
			if ( val !== undefined ) return val
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
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_bottom(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_left(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_top(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}


		/**
		 * ```tree
		 * swipe_from_right?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_right(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_from_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_bottom(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_from_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_left(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_from_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_from_top(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}


		/**
		 * ```tree
		 * swipe_to_right?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_right(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_to_bottom?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_bottom(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_to_left?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_left(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * swipe_to_top?val null
		 * ```
		 */
		@ $mol_mem
		swipe_to_top(val?: any) {
			if ( val !== undefined ) return val
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
			}
		}


		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	touchstart?event <=> event_start?event null
		 * 	touchmove?event <=> event_move?event null
		 * 	touchend?event <=> event_end?event null
		 * 	mousedown?event <=> event_start?event null
		 * 	mousemove?event <=> event_move?event null
		 * 	mouseup?event <=> event_end?event null
		 * 	mouseleave?event <=> event_leave?event null
		 * 	wheel?event <=> event_wheel?event null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				touchstart: (event?: any) => this.event_start(event),
				touchmove: (event?: any) => this.event_move(event),
				touchend: (event?: any) => this.event_end(event),
				mousedown: (event?: any) => this.event_start(event),
				mousemove: (event?: any) => this.event_move(event),
				mouseup: (event?: any) => this.event_end(event),
				mouseleave: (event?: any) => this.event_leave(event),
				wheel: (event?: any) => this.event_wheel(event)
			}
		}

		/**
		 * ```tree
		 * event_start?event null
		 * ```
		 */
		@ $mol_mem
		event_start(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_move?event null
		 * ```
		 */
		@ $mol_mem
		event_move(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_end?event null
		 * ```
		 */
		@ $mol_mem
		event_end(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_leave?event null
		 * ```
		 */
		@ $mol_mem
		event_leave(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_wheel?event null
		 * ```
		 */
		@ $mol_mem
		event_wheel(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
