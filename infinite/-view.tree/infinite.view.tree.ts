namespace $ {
	export class $mol_infinite extends $mol_list {

		/**
		 * ```tree
		 * after!id /
		 * ```
		 */
		after(id: any) {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Row!id $mol_view
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_view()

			return obj
		}
	}

}
