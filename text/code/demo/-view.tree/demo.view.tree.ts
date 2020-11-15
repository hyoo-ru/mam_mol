namespace $ {
	export class $mol_text_code_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Markdow visualization example
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_text_code_demo_title' )
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
		 * source \
		 * ```
		 */
		source() {
			return ""
		}

		/**
		 * ```tree
		 * Text $mol_text_code text <= source
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_text_code()

			obj.text = () => this.source()

			return obj
		}

		/**
		 * ```tree
		 * Scroll $mol_scroll sub / <= Text
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Text()
			] as readonly any[]

			return obj
		}
	}

}
