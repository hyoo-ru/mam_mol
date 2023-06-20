namespace $ {
	export class $mol_drag extends $mol_ghost {
		
		/**
		 * ```tree
		 * event *
		 * 	dragstart?event <=> drag_start?event
		 * 	drag?event <=> drag_move?event
		 * 	dragend?event <=> drag_end?event
		 * ```
		 */
		event() {
			return {
				dragstart: (event?: any) => this.drag_start(event),
				drag: (event?: any) => this.drag_move(event),
				dragend: (event?: any) => this.drag_end(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	draggable true
		 * 	mol_drag_status <= status?
		 * ```
		 */
		attr() {
			return {
				draggable: true,
				mol_drag_status: this.status()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * transfer *
		 * 	text/plain \
		 * 	text/html \
		 * 	text/uri-list \
		 * ```
		 */
		transfer() {
			return {
				"text/plain": "",
				"text/html": "",
				"text/uri-list": ""
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * allow_copy true
		 * ```
		 */
		allow_copy() {
			return true
		}
		
		/**
		 * ```tree
		 * allow_link true
		 * ```
		 */
		allow_link() {
			return true
		}
		
		/**
		 * ```tree
		 * allow_move true
		 * ```
		 */
		allow_move() {
			return true
		}
		
		/**
		 * ```tree
		 * image <= dom_node
		 * ```
		 */
		image() {
			return this.dom_node()
		}
		
		/**
		 * ```tree
		 * start?event null
		 * ```
		 */
		@ $mol_mem
		start(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * drag_start?event <=> start?event
		 * ```
		 */
		drag_start(event?: any) {
			return this.start(event)
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
		 * drag_move?event <=> move?event
		 * ```
		 */
		drag_move(event?: any) {
			return this.move(event)
		}
		
		/**
		 * ```tree
		 * end?event null
		 * ```
		 */
		@ $mol_mem
		end(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * drag_end?event <=> end?event
		 * ```
		 */
		drag_end(event?: any) {
			return this.end(event)
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

