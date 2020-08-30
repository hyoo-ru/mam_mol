namespace $ {
	export class $mol_ghost extends $mol_view {

		/**
		 * ```tree
		 * Sub $mol_view
		 * ```
		 */
		@ $mol_mem
		Sub() {
			const obj = new this.$.$mol_view()

			return obj
		}
	}

}
