namespace $ {
	export class $mol_pop_over extends $mol_pop {
		
		/**
		 * ```tree
		 * showed <= hovered?val
		 * ```
		 */
		showed() {
			return this.hovered()
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	tabindex 0
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				tabindex: 0
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	mouseenter?event <=> event_show?event
		 * 	mouseleave?event <=> event_hide?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				mouseenter: (event?: any) => this.event_show(event),
				mouseleave: (event?: any) => this.event_hide(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * hovered?val false
		 * ```
		 */
		@ $mol_mem
		hovered(val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * event_show?event null
		 * ```
		 */
		@ $mol_mem
		event_show(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_hide?event null
		 * ```
		 */
		@ $mol_mem
		event_hide(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
	}
	
}

