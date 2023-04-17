namespace $ {
	export class $mol_check_box_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Checkboxes in various states
		 * ```
		 */
		title() {
			return "Checkboxes in various states"
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
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
		 * aspects /
		 * 	\Widget/Control/Button
		 * 	\Type/Boolean
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button",
				"Type/Boolean"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * base_checked?val false
		 * ```
		 */
		@ $mol_mem
		base_checked(val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * c1Label \Base
		 * ```
		 */
		c1Label() {
			return "Base"
		}
		
		/**
		 * ```tree
		 * Labeled_base $mol_check_box
		 * 	checked?val <=> base_checked?val
		 * 	title <= c1Label
		 * ```
		 */
		@ $mol_mem
		Labeled_base() {
			const obj = new this.$.$mol_check_box()
			
			obj.checked = (val?: any) => this.base_checked(val)
			obj.title = () => this.c1Label()
			
			return obj
		}
		
		/**
		 * ```tree
		 * c2Label \Checked
		 * ```
		 */
		c2Label() {
			return "Checked"
		}
		
		/**
		 * ```tree
		 * checked_checked?val true
		 * ```
		 */
		@ $mol_mem
		checked_checked(val?: any) {
			if ( val !== undefined ) return val as never
			return true
		}
		
		/**
		 * ```tree
		 * Labeled_checked $mol_check_box
		 * 	title <= c2Label
		 * 	checked?val <=> checked_checked?val
		 * ```
		 */
		@ $mol_mem
		Labeled_checked() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.c2Label()
			obj.checked = (val?: any) => this.checked_checked(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * c6Label \Disabled
		 * ```
		 */
		c6Label() {
			return "Disabled"
		}
		
		/**
		 * ```tree
		 * Labeled_disabled $mol_check_box
		 * 	title <= c6Label
		 * 	checked true
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Labeled_disabled() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.c6Label()
			obj.checked = () => true
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Alone_base $mol_check_box checked?val <=> base_checked?val
		 * ```
		 */
		@ $mol_mem
		Alone_base() {
			const obj = new this.$.$mol_check_box()
			
			obj.checked = (val?: any) => this.base_checked(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Alone_checked $mol_check_box checked?val <=> checked_checked?val
		 * ```
		 */
		@ $mol_mem
		Alone_checked() {
			const obj = new this.$.$mol_check_box()
			
			obj.checked = (val?: any) => this.checked_checked(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Alone_disabled $mol_check_box
		 * 	checked true
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Alone_disabled() {
			const obj = new this.$.$mol_check_box()
			
			obj.checked = () => true
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list rows /
		 * 	<= Labeled_base
		 * 	<= Labeled_checked
		 * 	<= Labeled_disabled
		 * 	<= Alone_base
		 * 	<= Alone_checked
		 * 	<= Alone_disabled
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Labeled_base(),
				this.Labeled_checked(),
				this.Labeled_disabled(),
				this.Alone_base(),
				this.Alone_checked(),
				this.Alone_disabled()
			] as readonly any[]
			
			return obj
		}
	}
	
}

