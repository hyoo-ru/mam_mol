namespace $ {
	export class $mol_array_demo_chunks extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const chunked_every = $mol_array_chunks( [ 1, 2, 3, 4, 5 ], () => true )
		 * 	\const chunked_second = $mol_array_chunks( [ 1, 2, 3, 4, 5 ], (_,i)=> i === 2 )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const chunked_every = $mol_array_chunks( [ 1, 2, 3, 4, 5 ], () => true )\nconst chunked_second = $mol_array_chunks( [ 1, 2, 3, 4, 5 ], (_,i)=> i === 2 )"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\array
		 * 	\chunks
		 * ```
		 */
		tags() {
			return [
				"array",
				"chunks"
			] as readonly any[]
		}
	}
	
}

