namespace $ {
	export class $mol_float extends $mol_view {

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	minHeight \auto
		 * ```
		 */
		style() {
			return {
				...super.style(),
				minHeight: "auto"
			}
		}
	}

}
