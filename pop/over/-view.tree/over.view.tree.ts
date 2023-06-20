namespace $ {
	export class $mol_pop_over extends $mol_pop {
		
		/**
		 * ```tree
		 * showed <= hovered?
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
		 * hovered? false
		 * ```
		 */
		@ $mol_mem
		hovered(next?: any) {
			if ( next !== undefined ) return next as never
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

