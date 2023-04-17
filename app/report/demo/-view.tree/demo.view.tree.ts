namespace $ {
	export class $mol_app_report_demo extends $mol_example_large {
		
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
		 * aspects / \Widget/Form
		 * ```
		 */
		aspects() {
			return [
				"Widget/Form"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_app_report
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_app_report()
			
			return obj
		}
	}
	
}

