namespace $ {
	export class $mol_data_tagged_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const { Weight, Length } = $mol_data_tagged({
		 * 	\	Weight: $mol_data_integer,
		 * 	\	Length: $mol_data_integer,
		 * 	\})
		 * 	\
		 * 	\let weight = Weight( 50 ) // ✅
		 * 	\weight = Length( 50 ) // ❌ Type '"Weight"' is not assignable to type '"Length"'
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const { Weight, Length } = $mol_data_tagged({\n\tWeight: $mol_data_integer,\n\tLength: $mol_data_integer,\n})\n\nlet weight = Weight( 50 ) // ✅\nweight = Length( 50 ) // ❌ Type '\"Weight\"' is not assignable to type '\"Length\"'"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\tagged
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"tagged"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Algorithm/Assert
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert"
			] as readonly any[]
		}
	}
	
}

