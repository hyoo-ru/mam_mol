namespace $ {
	export class $mol_map_yandex_mark extends $mol_object {

		/**
		 * ```tree
		 * pos $mol_vector_2d /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		pos() {
			const obj = new this.$.$mol_vector_2d(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * box $mol_vector_2d /
		 * 	<= box_lat $mol_vector_range /
		 * 		0
		 * 		0
		 * 	<= box_lon $mol_vector_range /
		 * 		0
		 * 		0
		 * ```
		 */
		@ $mol_mem
		box() {
			const obj = new this.$.$mol_vector_2d(
				this.box_lat(),
				this.box_lon()
			)

			return obj
		}

		/**
		 * ```tree
		 * box_lat $mol_vector_range /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		box_lat() {
			const obj = new this.$.$mol_vector_range(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * box_lon $mol_vector_range /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		box_lon() {
			const obj = new this.$.$mol_vector_range(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return ""
		}

		/**
		 * ```tree
		 * title <= address \
		 * ```
		 */
		title() {
			return this.address()
		}

		/**
		 * ```tree
		 * address \
		 * ```
		 */
		address() {
			return ""
		}

		/**
		 * ```tree
		 * content \
		 * ```
		 */
		content() {
			return ""
		}

		/**
		 * ```tree
		 * object null
		 * ```
		 */
		object() {
			return null as any
		}
	}

}
