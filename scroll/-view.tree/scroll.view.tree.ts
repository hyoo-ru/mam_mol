namespace $ {
	export class $mol_scroll extends $mol_view {

		/**
		 * ```tree
		 * minimal_height 0
		 * ```
		 */
		minimal_height() {
			return 0
		}

		/**
		 * ```tree
		 * _event_scroll_timer?val null
		 * ```
		 */
		@ $mol_mem
		_event_scroll_timer(val?: any) {
			if ( val !== undefined ) return val
			return null as any
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
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * scroll_left?val 0
		 * ```
		 */
		@ $mol_mem
		scroll_left(val?: any) {
			if ( val !== undefined ) return val
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
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
