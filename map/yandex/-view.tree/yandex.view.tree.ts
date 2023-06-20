namespace $ {
	export class $mol_map_yandex extends $mol_view {
		
		/**
		 * ```tree
		 * zoom? 2
		 * ```
		 */
		@ $mol_mem
		zoom(next?: any) {
			if ( next !== undefined ) return next as never
			return 2
		}
		
		/**
		 * ```tree
		 * center? /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		center(next?: any) {
			if ( next !== undefined ) return next as never
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

