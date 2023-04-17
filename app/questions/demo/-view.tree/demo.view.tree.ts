namespace $ {
	export class $mol_app_questions_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \New questions from StackOverflow
		 * ```
		 */
		title() {
			return "New questions from StackOverflow"
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
		 * aspects /
		 * 	\Application
		 * 	\Network/HTTP
		 * 	\Integration
		 * ```
		 */
		aspects() {
			return [
				"Application",
				"Network/HTTP",
				"Integration"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_app_questions
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_app_questions()
			
			return obj
		}
	}
	
}

