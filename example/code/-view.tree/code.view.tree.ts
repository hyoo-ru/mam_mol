namespace $ {
	export class $mol_example_code extends $mol_example {
		
		/**
		 * ```tree
		 * sub / <= Sandbox
		 * ```
		 */
		sub() {
			return [
				this.Sandbox()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * code? \
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Sandbox $hyoo_js_eval
		 * 	Menu_page null
		 * 	Perf null
		 * 	Bookmark null
		 * 	code? <=> code?
		 * ```
		 */
		@ $mol_mem
		Sandbox() {
			const obj = new this.$.$hyoo_js_eval()
			
			obj.Menu_page = () => null as any
			obj.Perf = () => null as any
			obj.Bookmark = () => null as any
			obj.code = (next?: any) => this.code(next)
			
			return obj
		}
	}
	
}

