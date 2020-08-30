namespace $ {
	export class $mol_form extends $mol_view {

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
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Bar_fields $mol_view sub <= form_fields /$mol_form_field
		 * 	<= Bar_buttons $mol_row sub <= buttons /$mol_view
		 * ```
		 */
		sub() {
			return [
				this.Bar_fields(),
				this.Bar_buttons()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Bar_fields $mol_view sub <= form_fields /$mol_form_field
		 * ```
		 */
		@ $mol_mem
		Bar_fields() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.form_fields()

			return obj
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
		 * Bar_buttons $mol_row sub <= buttons /$mol_view
		 * ```
		 */
		@ $mol_mem
		Bar_buttons() {
			const obj = new this.$.$mol_row()

			obj.sub = () => this.buttons()

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
	}

}
