namespace $ {

	export const $mol_font_loaded_cache = new Set< string >()

	export function $mol_font_loaded( face : string , next? : boolean ) {
		
		if( next ) $mol_font_loaded_cache.add( face )
		if( $mol_font_loaded_cache.has( face ) ) return true

		const mono = $mol_font_measure( 16 , face + ', monospace' , 'W' )
		const sans = $mol_font_measure( 16 , face + ', sans-serif' , 'W' )
		
		return mono === sans
	}

}
