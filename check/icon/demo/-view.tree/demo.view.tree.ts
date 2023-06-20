namespace $ {
	export class $mol_check_icon_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Iconic checkboxes in various states
		 * ```
		 */
		title() {
			return "Iconic checkboxes in various states"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Base
		 * 	<= Checked
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
		 * tags /
		 * 	\switch
		 * 	\toggle
		 * ```
		 */
		tags() {
			return [
				"switch",
				"toggle"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control/Button
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button"
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
		 * base_checked? false
		 * ```
		 */
		@ $mol_mem
		base_checked(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Base $mol_check_icon
		 * 	Icon <= Base_icon
		 * 	checked? <=> base_checked?
		 * ```
		 */
		@ $mol_mem
		Base() {
			const obj = new this.$.$mol_check_icon()
			
			obj.Icon = () => this.Base_icon()
			obj.checked = (next?: any) => this.base_checked(next)
			
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
		 * checked_checked? true
		 * ```
		 */
		@ $mol_mem
		checked_checked(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Checked $mol_check_icon
		 * 	Icon <= Checked_icon
		 * 	checked? <=> checked_checked?
		 * ```
		 */
		@ $mol_mem
		Checked() {
			const obj = new this.$.$mol_check_icon()
			
			obj.Icon = () => this.Checked_icon()
			obj.checked = (next?: any) => this.checked_checked(next)
			
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

