namespace $ {

	export function $mol_font_wait( face : string ) {
		if( $mol_font_loaded( face ) ) return
		$mol_state_time.now()
		throw new $mol_atom_wait( `Wait font face: ${ face }` )
	}

}
