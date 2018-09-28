namespace $ {

	export const $mol_font_wait_started = new Map< string , number >()

	export function $mol_font_wait( face : string , timeout = 5000 ) {
		if( $mol_font_loaded( face ) ) return true

		const time = $mol_state_time.now()
		const started = $mol_font_wait_started.get( face ) || time
		$mol_font_wait_started.set( face , started )

		if( time - started > timeout ) return $mol_font_loaded( face , true )
		
		throw new $mol_atom_wait( `Wait font face: ${ face }` )
	}

}
