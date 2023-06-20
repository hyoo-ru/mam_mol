namespace $ {
	export class $mol_link_lazy extends $mol_link {
		
		/**
		 * ```tree
		 * uri? \
		 * ```
		 */
		@ $mol_mem
		uri(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * uri_generated \
		 * ```
		 */
		uri_generated() {
			return ""
		}
		
		/**
		 * ```tree
		 * current false
		 * ```
		 */
		current() {
			return false
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	mousedown?event <=> generate?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				mousedown: (event?: any) => this.generate(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * generate?event null
		 * ```
		 */
		@ $mol_mem
		generate(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
	}
	
}

