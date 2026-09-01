namespace $ {
	
	/** @deprecated Use `$mol_wire_probe` */
	export let $mol_atom2_value = $mol_wire_probe
	
	/** @deprecated Use `$mol_wire_field` */
	export let $mol_atom2_field = $mol_wire_field
	
	/** @deprecated Doesn't reqired anymore */
	export function $mol_atom2_autorun( calculate : ()=> any ) {
		return new $mol_after_frame( calculate )
	}
	
}
