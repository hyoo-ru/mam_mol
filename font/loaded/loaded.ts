namespace $ {

	export const $mol_font_loaded_cache = new Set< string >()

	export function $mol_font_loaded( config : { face : string , text : string } , next? : boolean ) {
		
		if( next ) $mol_font_loaded_cache.add( config.face )
		if( $mol_font_loaded_cache.has( config.face ) ) return true

		const mono = $mol_font_measure( 16 , config.face + ', monospace' , config.text )
		const sans = $mol_font_measure( 16 , config.face + ', sans-serif' , config.text )
		
		return mono === sans
	}

}
