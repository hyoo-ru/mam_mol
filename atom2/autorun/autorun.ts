namespace $ {

	/** @deprecated Doesn't reqired anymore */
	export function $mol_atom2_autorun( calculate : ()=> any ) {
		return new $mol_after_frame( calculate )
	}

}
