namespace $ {

	/**
	 * Recursive `-Readonly`.
	 * 
	 * 	let props : $mol_type_mutable< { readonly foo: number[] } > = { foo: number[] }
	 */
	export type $mol_type_mutable_deep< Val > = {
		-readonly [ field in keyof Val ]: $mol_type_mutable_deep< Val[ field ] >
	}

}
