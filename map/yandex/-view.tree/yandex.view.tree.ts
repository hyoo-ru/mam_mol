namespace $ {
	export class $mol_map_yandex extends $mol_view {

		/**
		 * ```tree
		 * zoom?val 2
		 * ```
		 */
		@ $mol_mem
		zoom(val?: any) {
			if ( val !== undefined ) return val
			return 2
		}

		/**
		 * ```tree
		 * center?val /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		center(val?: any) {
			if ( val !== undefined ) return val
			return [
				0,
				0
			] as readonly any[]
		}

		/**
		 * ```tree
		 * objects /$mol_map_yandex_mark
		 * ```
		 */
		objects() {
			return [

			] as readonly $mol_map_yandex_mark[]
		}
	}

}
