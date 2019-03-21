namespace $ {
	
	console.warn( '$mol_atom_current is deprecated. Use `$mol_atom2.current` instead.' )

	export function $mol_atom_current< Value = any >() {
		return $mol_atom.stack[0] as $mol_atom< Value >
	}
	
}
