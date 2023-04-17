namespace $ {
	export class $mol_app_hello_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Simpliest application
		 * ```
		 */
		title() {
			return "Simpliest application"
		}
		
		/**
		 * ```tree
		 * sub / <= App
		 * ```
		 */
		sub() {
			return [
				this.App()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Application
		 * ```
		 */
		aspects() {
			return [
				"Application"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_app_hello
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_app_hello()
			
			return obj
		}
	}
	
}

