namespace $ {

	export type $mol_sourcemap_segment = [number] | [number, number, number, number] | [number, number, number, number, number]
	export type $mol_sourcemap_line = $mol_sourcemap_segment[]
	export type $mol_sourcemap_mappings = $mol_sourcemap_line[]

	export interface $mol_sourcemap_raw {
		version: number
		sources: string[]
		names?: string[]
		sourceRoot?: string
		sourcesContent?: (string | null)[]
		mappings: string | $mol_sourcemap_line[]
		file?: string
	}

	export function $mol_sourcemap_strip(this: $, data: string) {
		return data.replace( /^\/\/#\s*sourceMappingURL=[^\n]*/mg , '' ) + '\n'
	}
}
