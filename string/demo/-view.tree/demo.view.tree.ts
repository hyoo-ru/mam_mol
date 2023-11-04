namespace $ {
	export class $mol_string_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \String input field in various states
		 * ```
		 */
		title() {
			return "String input field in various states"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Simple
		 * 	<= Hint
		 * 	<= Broken
		 * 	<= Filled
		 * 	<= Disabled
		 * 	<= Button
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Hint(),
				this.Broken(),
				this.Filled(),
				this.Disabled(),
				this.Button()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\input
		 * 	\text
		 * 	\field
		 * ```
		 */
		tags() {
			return [
				"input",
				"text",
				"field"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control
		 * 	\Type/String
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control",
				"Type/String"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * name? \
		 * ```
		 */
		@ $mol_mem
		name(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Simple $mol_string value? <=> name?
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.name(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint $mol_string
		 * 	hint \Batman
		 * 	value? <=> name?
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "Batman"
			obj.value = (next?: any) => this.name(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * broken? \
		 * ```
		 */
		@ $mol_mem
		broken(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Broken $mol_string
		 * 	hint \Broken
		 * 	value? <=> broken?
		 * ```
		 */
		@ $mol_mem
		Broken() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "Broken"
			obj.value = (next?: any) => this.broken(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * name2? \Jocker
		 * ```
		 */
		@ $mol_mem
		name2(next?: any) {
			if ( next !== undefined ) return next as never
			return "Jocker"
		}
		
		/**
		 * ```tree
		 * Filled $mol_string value? <=> name2?
		 * ```
		 */
		@ $mol_mem
		Filled() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.name2(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled $mol_string
		 * 	disabled true
		 * 	value? <=> name2?
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_string()
			
			obj.disabled = () => true
			obj.value = (next?: any) => this.name2(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Button $mol_string_button value? <=> name2?
		 * ```
		 */
		@ $mol_mem
		Button() {
			const obj = new this.$.$mol_string_button()
			
			obj.value = (next?: any) => this.name2(next)
			
			return obj
		}
	}
	
}

