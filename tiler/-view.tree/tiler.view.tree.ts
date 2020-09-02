namespace $ {
	export class $mol_tiler extends $mol_view {

		/**
		 * ```tree
		 * sub <= items
		 * ```
		 */
		sub() {
			return this.items()
		}

		/**
		 * ```tree
		 * items /$mol_view
		 * ```
		 */
		items() {
			return [

			] as readonly $mol_view[]
		}
	}

}
