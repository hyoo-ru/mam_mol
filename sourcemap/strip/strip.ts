namespace $ {

	export function $mol_sourcemap_strip(this: $, data: string) {
		return data.replace( /^(?:(?:\/\/)|(?:\/\*))\s*#\s*sourceMappingURL\s*=[^\n]*/mg , '' ) + '\n'
	}
	
}
