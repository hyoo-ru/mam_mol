namespace $ {
	export class $mol_drop extends $mol_ghost {

		/**
		 * ```tree
		 * event *
		 * 	dragenter?event <=> enter?event null
		 * 	dragover?event <=> move?event null
		 * 	dragleave?event <=> leave?event null
		 * 	drop?event <=> drop?event null
		 * ```
		 */
		event() {
			return {
				dragenter: (event?: any) => this.enter(event),
				dragover: (event?: any) => this.move(event),
				dragleave: (event?: any) => this.leave(event),
				drop: (event?: any) => this.drop(event)
			}
		}

		/**
		 * ```tree
		 * enter?event null
		 * ```
		 */
		@ $mol_mem
		enter(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * move?event null
		 * ```
		 */
		@ $mol_mem
		move(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * leave?event null
		 * ```
		 */
		@ $mol_mem
		leave(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * drop?event null
		 * ```
		 */
		@ $mol_mem
		drop(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * attr * mol_drop_status <= status?val \ready
		 * ```
		 */
		attr() {
			return {
				mol_drop_status: this.status()
			}
		}

		/**
		 * ```tree
		 * status?val \ready
		 * ```
		 */
		@ $mol_mem
		status(val?: any) {
			if ( val !== undefined ) return val
			return "ready"
		}

		/**
		 * ```tree
		 * adopt?transfer *
		 * ```
		 */
		@ $mol_mem
		adopt(transfer?: any) {
			if ( transfer !== undefined ) return transfer
			return {

			}
		}

		/**
		 * ```tree
		 * receive?transfer null
		 * ```
		 */
		@ $mol_mem
		receive(transfer?: any) {
			if ( transfer !== undefined ) return transfer
			return null as any
		}
	}

}
