namespace $ {
	export class $mol_hotkey extends $mol_plugin {

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	keydown?event <=> keydown?event null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				keydown: (event?: any) => this.keydown(event)
			}
		}

		/**
		 * ```tree
		 * keydown?event null
		 * ```
		 */
		@ $mol_mem
		keydown(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * key *
		 * ```
		 */
		key() {
			return {

			}
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
	}

}
