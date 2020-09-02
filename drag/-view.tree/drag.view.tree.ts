namespace $ {
	export class $mol_drag extends $mol_ghost {

		/**
		 * ```tree
		 * event *
		 * 	dragstart?event <=> start?event
		 * 	drag?event <=> move?event
		 * 	dragend?event <=> end?event
		 * ```
		 */
		event() {
			return {
				dragstart: (event?: any) => this.start(event),
				drag: (event?: any) => this.move(event),
				dragend: (event?: any) => this.end(event)
			}
		}

		/**
		 * ```tree
		 * attr *
		 * 	draggable true
		 * 	mol_drag_status <= status?val
		 * ```
		 */
		attr() {
			return {
				draggable: true,
				mol_drag_status: this.status()
			}
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
			}
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
		 * end?event null
		 * ```
		 */
		@ $mol_mem
		end(event?: any) {
			if ( event !== undefined ) return event
			return null as any
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
	}

}
