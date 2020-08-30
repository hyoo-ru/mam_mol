namespace $ {
	export class $mol_book2 extends $mol_scroll {

		/**
		 * ```tree
		 * sub <= pages /$mol_view
		 * ```
		 */
		sub() {
			return this.pages()
		}

		/**
		 * ```tree
		 * pages /$mol_view
		 * ```
		 */
		pages() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * minimal_width 0
		 * ```
		 */
		minimal_width() {
			return 0
		}

		/**
		 * ```tree
		 * Placeholder $mol_view
		 * ```
		 */
		@ $mol_mem
		Placeholder() {
			const obj = new this.$.$mol_view()

			return obj
		}
	}

}
