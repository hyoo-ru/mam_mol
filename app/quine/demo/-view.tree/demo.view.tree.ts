namespace $ {
	export class $mol_app_quine_demo extends $mol_example_large {
		
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
		 * aspects /
		 * 	\Application
		 * 	\Network/HTTP
		 * ```
		 */
		aspects() {
			return [
				"Application",
				"Network/HTTP"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_app_quine
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_app_quine()
			
			return obj
		}
	}
	
}

