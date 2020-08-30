namespace $ {
	export class $mol_tiler extends $mol_view {

		/**
		 * ```tree
		 * sub <= items /$mol_view
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
