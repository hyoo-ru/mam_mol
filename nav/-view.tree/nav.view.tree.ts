namespace $ {
	export class $mol_nav extends $mol_plugin {

		/**
		 * ```tree
		 * cycle?val false
		 * ```
		 */
		@ $mol_mem
		cycle(val?: any) {
			if ( val !== undefined ) return val
			return false
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
		 * mod_shift false
		 * ```
		 */
		mod_shift() {
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
		 * keys_x?val /
		 * ```
		 */
		@ $mol_mem
		keys_x(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * keys_y?val /
		 * ```
		 */
		@ $mol_mem
		keys_y(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly any[]
		}


		/**
		 * ```tree
		 * current_x?val \
		 * ```
		 */
		@ $mol_mem
		current_x(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * current_y?val \
		 * ```
		 */
		@ $mol_mem
		current_y(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}


		/**
		 * ```tree
		 * event_up?event null
		 * ```
		 */
		@ $mol_mem
		event_up(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_down?event null
		 * ```
		 */
		@ $mol_mem
		event_down(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_left?event null
		 * ```
		 */
		@ $mol_mem
		event_left(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_right?event null
		 * ```
		 */
		@ $mol_mem
		event_right(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	keydown?event <=> event_key?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				keydown: (event?: any) => this.event_key(event)
			}
		}

		/**
		 * ```tree
		 * event_key?event null
		 * ```
		 */
		@ $mol_mem
		event_key(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
