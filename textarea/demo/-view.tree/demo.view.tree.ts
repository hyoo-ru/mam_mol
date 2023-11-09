namespace $ {
	export class $mol_textarea_demo extends $mol_example {
		
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
		 * sub / <= Content
		 * ```
		 */
		sub() {
			return [
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\code
		 * 	\syntax
		 * 	\highlight
		 * ```
		 */
		tags() {
			return [
				"code",
				"syntax",
				"highlight"
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
		 * 	hint \source code
		 * 	value? <=> filled_descr?
		 * ```
		 */
		@ $mol_mem
		Filled_descr() {
			const obj = new this.$.$mol_textarea()
			
			obj.sidebar_showed = () => true
			obj.hint = () => "source code"
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
		 * Disabled $mol_text text <= symbols_hint
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.symbols_hint()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Filled_descr
		 * 	<= Disabled
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Filled_descr(),
				this.Disabled()
			] as readonly any[]
			
			return obj
		}
	}
	
}

