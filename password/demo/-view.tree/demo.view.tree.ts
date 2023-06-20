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
		 * tags / \input
		 * ```
		 */
		tags() {
			return [
				"input"
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
		 * pass? \Hello world
		 * ```
		 */
		@ $mol_mem
		pass(next?: any) {
			if ( next !== undefined ) return next as never
			return "Hello world"
		}
		
		/**
		 * ```tree
		 * Simple $mol_password value? <=> pass?
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_password()
			
			obj.value = (next?: any) => this.pass(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * pass2? \
		 * ```
		 */
		@ $mol_mem
		pass2(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Hint $mol_password
		 * 	value? <=> pass2?
		 * 	hint \Top secret
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_password()
			
			obj.value = (next?: any) => this.pass2(next)
			obj.hint = () => "Top secret"
			
			return obj
		}
	}
	
}

