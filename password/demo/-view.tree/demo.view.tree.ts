namespace $ {
	export class $mol_password_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Password input field based on $mol_string
		 * ```
		 */
		title() {
			return "Password input field based on $mol_string"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Simple
		 * 	<= Hint
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Hint()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\password
		 * 	\input
		 * ```
		 */
		tags() {
			return [
				"password",
				"input"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * pass?val \Hello world
		 * ```
		 */
		@ $mol_mem
		pass(val?: any) {
			if ( val !== undefined ) return val as never
			return "Hello world"
		}
		
		/**
		 * ```tree
		 * Simple $mol_password value?val <=> pass?val
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_password()
			
			obj.value = (val?: any) => this.pass(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * pass2?val \
		 * ```
		 */
		@ $mol_mem
		pass2(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Hint $mol_password
		 * 	value?val <=> pass2?val
		 * 	hint \Top secret
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_password()
			
			obj.value = (val?: any) => this.pass2(val)
			obj.hint = () => "Top secret"
			
			return obj
		}
	}
	
}

