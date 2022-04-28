namespace $ {
	export class $mol_form extends $mol_list {
		
		/**
		 * ```tree
		 * submit_blocked false
		 * ```
		 */
		submit_blocked() {
			return false
		}
		
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
			}
		}
		
		/**
		 * ```tree
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * rows /
		 * 	<= Body
		 * 	<= Foot
		 * ```
		 */
		rows() {
			return [
				this.Body(),
				this.Foot()
			] as readonly any[]
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
		
		/**
		 * ```tree
		 * form_fields /$mol_form_field
		 * ```
		 */
		form_fields() {
			return [
			] as readonly $mol_form_field[]
		}
		
		/**
		 * ```tree
		 * body <= form_fields
		 * ```
		 */
		body() {
			return this.form_fields()
		}
		
		/**
		 * ```tree
		 * Body $mol_list sub <= body
		 * ```
		 */
		@ $mol_mem
		Body() {
			const obj = new this.$.$mol_list()
			
			obj.sub = () => this.body()
			
			return obj
		}
		
		/**
		 * ```tree
		 * buttons /$mol_view
		 * ```
		 */
		buttons() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * foot <= buttons
		 * ```
		 */
		foot() {
			return this.buttons()
		}
		
		/**
		 * ```tree
		 * Foot $mol_row sub <= foot
		 * ```
		 */
		@ $mol_mem
		Foot() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => this.foot()
			
			return obj
		}
	}
	
}

