namespace $ {
	export class $mol_scroll_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Simple scroll pane
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_scroll_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Scroll $mol_scroll sub / <= Content $mol_row sub /
		 * 	<= One $mol_filler
		 * 	<= Two $mol_filler
		 * 	<= Tree $mol_filler
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Scroll $mol_scroll sub / <= Content $mol_row sub /
		 * 	<= One $mol_filler
		 * 	<= Two $mol_filler
		 * 	<= Tree $mol_filler
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Content()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Content $mol_row sub /
		 * 	<= One $mol_filler
		 * 	<= Two $mol_filler
		 * 	<= Tree $mol_filler
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.One(),
				this.Two(),
				this.Tree()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * One $mol_filler
		 * ```
		 */
		@ $mol_mem
		One() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Two $mol_filler
		 * ```
		 */
		@ $mol_mem
		Two() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Tree $mol_filler
		 * ```
		 */
		@ $mol_mem
		Tree() {
			const obj = new this.$.$mol_filler()

			return obj
		}
	}

}
