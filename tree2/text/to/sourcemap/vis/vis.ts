namespace $ {

	export function $mol_tree2_text_to_sourcemap_vis( this: $, text: $mol_tree2 ) {
		
		const code = this.$mol_tree2_text_to_string( text )
		const map = this.$mol_tree2_text_to_sourcemap( text )
		
		const uri = [
			'https://sokra.github.io/source-map-visualization/#base64',
			btoa( code ),
			btoa( JSON.stringify( map ) ),
			... map.sourcesContent?.filter($mol_guard_defined).map( btoa ) ?? [],
		].join( ',' )

		return uri

	}

}
