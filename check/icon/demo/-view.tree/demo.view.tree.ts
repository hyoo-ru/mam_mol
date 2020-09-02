namespace $ {
	export class $mol_check_icon_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Iconic checkboxes in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_check_icon_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Base
		 * 	-
		 * 	<= Checked
		 * 	-
		 * 	<= Disabled
		 * ```
		 */
		sub() {
			return [
				this.Base(),

				this.Checked(),

				this.Disabled()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Base_icon $mol_icon_microphone
		 * ```
		 */
		@ $mol_mem
		Base_icon() {
			const obj = new this.$.$mol_icon_microphone()

			return obj
		}

		/**
		 * ```tree
		 * base_checked?val false
		 * ```
		 */
		@ $mol_mem
		base_checked(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Base $mol_check_icon
		 * 	Icon <= Base_icon
		 * 	checked?val <=> base_checked?val
		 * ```
		 */
		@ $mol_mem
		Base() {
			const obj = new this.$.$mol_check_icon()

			obj.Icon = () => this.Base_icon()
			obj.checked = (val?: any) => this.base_checked(val)

			return obj
		}

		/**
		 * ```tree
		 * Checked_icon $mol_icon_microphone
		 * ```
		 */
		@ $mol_mem
		Checked_icon() {
			const obj = new this.$.$mol_icon_microphone()

			return obj
		}

		/**
		 * ```tree
		 * checked_checked?val true
		 * ```
		 */
		@ $mol_mem
		checked_checked(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * Checked $mol_check_icon
		 * 	Icon <= Checked_icon
		 * 	checked?val <=> checked_checked?val
		 * ```
		 */
		@ $mol_mem
		Checked() {
			const obj = new this.$.$mol_check_icon()

			obj.Icon = () => this.Checked_icon()
			obj.checked = (val?: any) => this.checked_checked(val)

			return obj
		}

		/**
		 * ```tree
		 * Disabled_icon $mol_icon_microphone
		 * ```
		 */
		@ $mol_mem
		Disabled_icon() {
			const obj = new this.$.$mol_icon_microphone()

			return obj
		}

		/**
		 * ```tree
		 * Disabled $mol_check_box
		 * 	Icon <= Disabled_icon
		 * 	checked true
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_check_box()

			obj.Icon = () => this.Disabled_icon()
			obj.checked = () => true
			obj.enabled = () => false

			return obj
		}
	}

}
