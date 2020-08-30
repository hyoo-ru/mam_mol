namespace $ {
	export class $mol_check_expand_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Checkbox-expand in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_check_expand_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Labeled_base $mol_check_expand
		 * 		checked?val <=> base_expanded?val false
		 * 		title <= c1Label @ \Base
		 * 	-
		 * 	<= Labeled_expanded $mol_check_expand
		 * 		title <= c2Label @ \Expanded
		 * 		checked?val <=> expanded_expanded?val true
		 * 	-
		 * 	<= Empty_base $mol_check_expand checked?val <=> base_expanded?val false
		 * 	-
		 * 	<= Empty_expanded $mol_check_expand checked?val <=> expanded_expanded?val true
		 * 	-
		 * 	<= Disabled $mol_check_expand
		 * 		title <= c5Label @ \Non expandable
		 * 		disabled true
		 * ```
		 */
		sub() {
			return [
				this.Labeled_base(),

				this.Labeled_expanded(),

				this.Empty_base(),

				this.Empty_expanded(),

				this.Disabled()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Labeled_base $mol_check_expand
		 * 	checked?val <=> base_expanded?val false
		 * 	title <= c1Label @ \Base
		 * ```
		 */
		@ $mol_mem
		Labeled_base() {
			const obj = new this.$.$mol_check_expand()

			obj.checked = (val?: any) => this.base_expanded(val)
			obj.title = () => this.c1Label()

			return obj
		}

		/**
		 * ```tree
		 * base_expanded?val false
		 * ```
		 */
		@ $mol_mem
		base_expanded(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * c1Label @ \Base
		 * ```
		 */
		c1Label() {
			return this.$.$mol_locale.text( '$mol_check_expand_demo_c1Label' )
		}

		/**
		 * ```tree
		 * Labeled_expanded $mol_check_expand
		 * 	title <= c2Label @ \Expanded
		 * 	checked?val <=> expanded_expanded?val true
		 * ```
		 */
		@ $mol_mem
		Labeled_expanded() {
			const obj = new this.$.$mol_check_expand()

			obj.title = () => this.c2Label()
			obj.checked = (val?: any) => this.expanded_expanded(val)

			return obj
		}

		/**
		 * ```tree
		 * c2Label @ \Expanded
		 * ```
		 */
		c2Label() {
			return this.$.$mol_locale.text( '$mol_check_expand_demo_c2Label' )
		}

		/**
		 * ```tree
		 * expanded_expanded?val true
		 * ```
		 */
		@ $mol_mem
		expanded_expanded(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * Empty_base $mol_check_expand checked?val <=> base_expanded?val false
		 * ```
		 */
		@ $mol_mem
		Empty_base() {
			const obj = new this.$.$mol_check_expand()

			obj.checked = (val?: any) => this.base_expanded(val)

			return obj
		}

		/**
		 * ```tree
		 * Empty_expanded $mol_check_expand checked?val <=> expanded_expanded?val true
		 * ```
		 */
		@ $mol_mem
		Empty_expanded() {
			const obj = new this.$.$mol_check_expand()

			obj.checked = (val?: any) => this.expanded_expanded(val)

			return obj
		}

		/**
		 * ```tree
		 * Disabled $mol_check_expand
		 * 	title <= c5Label @ \Non expandable
		 * 	disabled true
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_check_expand()

			obj.title = () => this.c5Label()
			obj.disabled = () => true

			return obj
		}

		/**
		 * ```tree
		 * c5Label @ \Non expandable
		 * ```
		 */
		c5Label() {
			return this.$.$mol_locale.text( '$mol_check_expand_demo_c5Label' )
		}
	}

}
