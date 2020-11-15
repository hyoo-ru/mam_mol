namespace $ {
	export class $mol_textarea_demo extends $mol_demo_large {

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
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
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
		 * Empty_descr $mol_textarea
		 * 	hint \source code
		 * 	value?val <=> empty_descr?val
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
		 * Filled_descr $mol_textarea value?val <=> filled_descr?val
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

		/**
		 * ```tree
		 * Scroll $mol_scroll sub /
		 * 	<= Empty_descr
		 * 	<= Filled_descr
		 * 	<= Disabled
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Empty_descr(),
				this.Filled_descr(),
				this.Disabled()
			] as readonly any[]

			return obj
		}
	}

}
