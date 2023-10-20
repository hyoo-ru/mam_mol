namespace $ {

	export function $mol_tree2_text_to_string_mapped( this: $, text: $mol_tree2, type: 'js' | 'css' ) {
		
		const code = this.$mol_tree2_text_to_string( text )
		const map = this.$mol_tree2_text_to_sourcemap( text )
		map.mappings = ';;' + map.mappings
		
		let res = code
		const map_uri = `data:application/json,${ this.encodeURIComponent( JSON.stringify( map ) ) }`
		
		if( type === 'js' ) res += `\n//# sourceMappingURL=${ map_uri }`
		else res += `\n/*# sourceMappingURL=${ map_uri } */`
		
		return res

	}

	export function $mol_tree2_text_to_string_mapped_js( this: $, text: $mol_tree2 ) {
		return this.$mol_tree2_text_to_string_mapped( text, 'js' )
	}
	
	export function $mol_tree2_text_to_string_mapped_css( this: $, text: $mol_tree2 ) {
		return this.$mol_tree2_text_to_string_mapped( text, 'css')
	}
	
}
