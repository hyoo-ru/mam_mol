namespace $ {
	export class $mol_drop extends $mol_ghost {
		
		/**
		 * ```tree
		 * enabled? true
		 * ```
		 */
		@ $mol_mem
		enabled(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * event *
		 * 	dragenter?event <=> enter?event
		 * 	dragover?event <=> move?event
		 * 	dragleave?event <=> leave?event
		 * 	drop?event <=> drop?event
		 * ```
		 */
		event() {
			return {
				dragenter: (event?: any) => this.enter(event),
				dragover: (event?: any) => this.move(event),
				dragleave: (event?: any) => this.leave(event),
				drop: (event?: any) => this.drop(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * attr * mol_drop_status <= status?
		 * ```
		 */
		attr() {
			return {
				mol_drop_status: this.status()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * adopt?transfer *
		 * ```
		 */
		@ $mol_mem
		adopt(transfer?: any) {
			if ( transfer !== undefined ) return transfer as never
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * receive?transfer null
		 * ```
		 */
		@ $mol_mem
		receive(transfer?: any) {
			if ( transfer !== undefined ) return transfer as never
			return null as any
		}
		
		/**
		 * ```tree
		 * allow /
		 * 	\link
		 * 	\copy
		 * 	\move
		 * ```
		 */
		allow() {
			return [
				"link",
				"copy",
				"move"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * enter?event null
		 * ```
		 */
		@ $mol_mem
		enter(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * move?event null
		 * ```
		 */
		@ $mol_mem
		move(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * leave?event null
		 * ```
		 */
		@ $mol_mem
		leave(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * drop?event null
		 * ```
		 */
		@ $mol_mem
		drop(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * status? \ready
		 * ```
		 */
		@ $mol_mem
		status(next?: any) {
			if ( next !== undefined ) return next as never
			return "ready"
		}
	}
	
}

