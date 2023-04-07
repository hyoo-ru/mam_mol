namespace $ {
	export class $mol_textarea_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Text input field in various states
		 * ```
		 */
		title() {
			return "Text input field in various states"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Empty_descr
		 * 	<= Filled_descr
		 * 	<= Disabled
		 * ```
		 */
		sub() {
			return [
				this.Empty_descr(),
				this.Filled_descr(),
				this.Disabled()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\textarea
		 * 	\code
		 * 	\syntax highlighting
		 * ```
		 */
		tags() {
			return [
				"textarea",
				"code",
				"syntax highlighting"
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
		 * empty_descr? \
		 * ```
		 */
		@ $mol_mem
		empty_descr(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Empty_descr $mol_textarea
		 * 	hint \source code
		 * 	value? <=> empty_descr?
		 * ```
		 */
		@ $mol_mem
		Empty_descr() {
			const obj = new this.$.$mol_textarea()
			
			obj.hint = () => "source code"
			obj.value = (next?: any) => this.empty_descr(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * filled_descr? \
		 * 	\function hello( name = 'World' ) {
		 * 	\	return `Hello, ${ name }!`
		 * 	\}
		 * ```
		 */
		@ $mol_mem
		filled_descr(next?: any) {
			if ( next !== undefined ) return next as never
			return "function hello( name = 'World' ) {\n\treturn `Hello, ${ name }!`\n}"
		}
		
		/**
		 * ```tree
		 * Filled_descr $mol_textarea
		 * 	sidebar_showed true
		 * 	value? <=> filled_descr?
		 * ```
		 */
		@ $mol_mem
		Filled_descr() {
			const obj = new this.$.$mol_textarea()
			
			obj.sidebar_showed = () => true
			obj.value = (next?: any) => this.filled_descr(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * symbols_hint \
		 * ```
		 */
		symbols_hint() {
			return ""
		}
		
		/**
		 * ```tree
		 * Disabled $mol_textarea
		 * 	enabled false
		 * 	value <= symbols_hint
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_textarea()
			
			obj.enabled = () => false
			obj.value = () => this.symbols_hint()
			
			return obj
		}
	}
	
}

