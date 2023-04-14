namespace $ {
	export class $mol_csv_parse_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const text = 'foo,bar\n"123","456"\n"x""xx","y""y""y"'
		 * 	\const data = $mol_csv_parse( csv )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const text = 'foo,bar\\n\"123\",\"456\"\\n\"x\"\"xx\",\"y\"\"y\"\"y\"'\nconst data = $mol_csv_parse( csv )"
		}
		
		/**
		 * ```tree
		 * tags / \table
		 * ```
		 */
		tags() {
			return [
				"table"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Language/CSV
		 * 	\Serializer
		 * ```
		 */
		aspects() {
			return [
				"Language/CSV",
				"Serializer"
			] as readonly any[]
		}
	}
	
}

