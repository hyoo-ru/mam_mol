namespace $ {
	
	/**
	 * Real-time refresh current atom.
	 * Don't use if possible. May reduce performance.
	 */
	export function $mol_wire_watch() {
		const atom = $mol_wire_auto()
		if( atom instanceof $mol_wire_atom ) {
			atom.watch()
		} else {
			$mol_fail( new Error( 'Atom is required for watching' ) )
		}
	}
	
}
