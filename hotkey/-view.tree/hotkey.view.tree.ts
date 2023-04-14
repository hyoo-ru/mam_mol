namespace $ {
	export class $mol_hotkey extends $mol_plugin {
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	keydown?event <=> keydown?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				keydown: (event?: any) => this.keydown(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * key *
		 * ```
		 */
		key() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * mod_ctrl false
		 * ```
		 */
		mod_ctrl() {
			return false
		}
		
		/**
		 * ```tree
		 * mod_alt false
		 * ```
		 */
		mod_alt() {
			return false
		}
		
		/**
		 * ```tree
		 * mod_shift false
		 * ```
		 */
		mod_shift() {
			return false
		}
		
		/**
		 * ```tree
		 * keydown?event null
		 * ```
		 */
		@ $mol_mem
		keydown(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
	}
	
}

