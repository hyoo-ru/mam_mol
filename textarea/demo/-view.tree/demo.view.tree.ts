namespace $ {
	export class $mol_textarea_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Text input field in various states
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_textarea_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Empty_descr $mol_textarea
		 * 		hint \source code
		 * 		value?val <=> empty_descr?val \
		 * 	<= Filled_descr $mol_textarea value?val <=> filled_descr?val \
		 * 		\function hello( name = 'World' ) {
		 * 		\	return `Hello, ${ name }!`
		 * 		\}
		 * 	<= Disabled $mol_textarea
		 * 		enabled false
		 * 		value?val <=> filled_descr?val
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
		 * Empty_descr $mol_textarea
		 * 	hint \source code
		 * 	value?val <=> empty_descr?val \
		 * ```
		 */
		@ $mol_mem
		Empty_descr() {
			const obj = new this.$.$mol_textarea()

			obj.hint = () => "source code"
			obj.value = (val?: any) => this.empty_descr(val)

			return obj
		}

		/**
		 * ```tree
		 * empty_descr?val \
		 * ```
		 */
		@ $mol_mem
		empty_descr(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Filled_descr $mol_textarea value?val <=> filled_descr?val \
		 * 	\function hello( name = 'World' ) {
		 * 	\	return `Hello, ${ name }!`
		 * 	\}
		 * ```
		 */
		@ $mol_mem
		Filled_descr() {
			const obj = new this.$.$mol_textarea()

			obj.value = (val?: any) => this.filled_descr(val)

			return obj
		}

		/**
		 * ```tree
		 * filled_descr?val \
		 * 	\function hello( name = 'World' ) {
		 * 	\	return `Hello, ${ name }!`
		 * 	\}
		 * ```
		 */
		@ $mol_mem
		filled_descr(val?: any) {
			if ( val !== undefined ) return val
			return "function hello( name = 'World' ) {\n\treturn `Hello, ${ name }!`\n}"
		}

		/**
		 * ```tree
		 * Disabled $mol_textarea
		 * 	enabled false
		 * 	value?val <=> filled_descr?val
		 * ```
		 */
		@ $mol_mem
		Disabled() {
			const obj = new this.$.$mol_textarea()

			obj.enabled = () => false
			obj.value = (val?: any) => this.filled_descr(val)

			return obj
		}
	}

}
