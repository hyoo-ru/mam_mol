namespace $ {
	export class $mol_scroll extends $mol_view {
		
		/**
		 * ```tree
		 * scroll_pos /
		 * 	0
		 * 	0
		 * ```
		 */
		scroll_pos() {
			return [
				0,
				0
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	scrollTop <= scroll_top?val
		 * 	scrollLeft <= scroll_left?val
		 * 	tabIndex <= tabindex
		 * ```
		 */
		field() {
			return {
				...super.field(),
				scrollTop: this.scroll_top(),
				scrollLeft: this.scroll_left(),
				tabIndex: this.tabindex()
			}
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	scroll?event <=> event_scroll?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				scroll: (event?: any) => this.event_scroll(event)
			}
		}
		
		/**
		 * ```tree
		 * scroll_top?val 0
		 * ```
		 */
		@ $mol_mem
		scroll_top(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * scroll_left?val 0
		 * ```
		 */
		@ $mol_mem
		scroll_left(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * tabindex -1
		 * ```
		 */
		tabindex() {
			return -1
		}
		
		/**
		 * ```tree
		 * event_scroll?event null
		 * ```
		 */
		@ $mol_mem
		event_scroll(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
	}
	
}

