namespace $ {
	export class $mol_array_chunks_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const res = $mol_array_chunks(
		 * 	\	[ 1, 2, 3, 4, 5 ],
		 * 	\	n => n % 2,
		 * 	\)
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const res = $mol_array_chunks(\n\t[ 1, 2, 3, 4, 5 ],\n\tn => n % 2,\n)"
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Type/List
		 * 	\Algorithm/Transform
		 * ```
		 */
		aspects() {
			return [
				"Type/List",
				"Algorithm/Transform"
			] as readonly any[]
		}
	}
	
}

