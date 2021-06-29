namespace $ {
	export class $mol_string_button_demo extends $mol_demo_small {
		
		/**
		 * ```tree
		 * title @ \String input button field in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_string_button_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Simple
		 * 	<= Hint
		 * 	<= Filled
		 * 	<= Disabled
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Hint(),
				this.Filled(),
				this.Disabled()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * name?val \
		 * ```
		 */
		@ $mol_mem
		name(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Simple $mol_string_button value?val <=> name?val
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_string_button()
			
			obj.value = (val?: any) => this.name(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint $mol_string_button
		 * 	hint \Batman
		 * 	value?val <=> name?val
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_string_button()
			
			obj.hint = () => "Batman"
			obj.value = (val?: any) => this.name(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * name2?val \Jocker
		 * ```
		 */
		@ $mol_mem
		name2(val?: any) {
			if ( val !== undefined ) return val as never
			return "Jocker"
		}
		
		/**
		 * ```tree
		 * Filled $mol_string_button value?val <=> name2?val
		 * ```
		 */
		@ $mol_mem
		Filled() {
			const obj = new this.$.$mol_string_button()
			
			obj.value = (val?: any) => this.name2(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled $mol_string_button
		 * 	disabled true
		 * 	value?val <=> name2?val
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_string_button()
			
			obj.disabled = () => true
			obj.value = (val?: any) => this.name2(val)
			
			return obj
		}
	}
	
}

