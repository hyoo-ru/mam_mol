namespace $ {
	export class $mol_csv_serial_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const data = [
		 * 	\	{ foo: '123', bar: '456' },
		 * 	\	{ foo: 'x"xx', bar: 'y"y"y' },
		 * 	\]
		 * 	\const text = $mol_csv_serial( data )
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const data = [\n\t{ foo: '123', bar: '456' },\n\t{ foo: 'x\"xx', bar: 'y\"y\"y' },\n]\nconst text = $mol_csv_serial( data )"
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
		 * 	\Language/TSV
		 * ```
		 */
		aspects() {
			return [
				"Language/CSV",
				"Language/TSV"
			] as readonly any[]
		}
	}
	
}

