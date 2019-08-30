namespace $ {

	/**
	 * Recursive `Partial`.
	 * 
	 * 	let props : $mol_type_partial_deep< HTMLElement > = { style : { display : 'block' } }
	 */
	export type $mol_type_partial_deep< Val > = {
		[ field in keyof Val ]? : $mol_type_partial_deep< Val[ field ] >
	}

}
