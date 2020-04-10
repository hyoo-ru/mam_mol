namespace $ {

	export function $mol_ambient_make< Obj >(
		this : $mol_ambient_context ,
		Obj : new( ... args : any[] )=> Obj ,
		overrides : Partial< $mol_ambient_context > ,
	) {
		const obj = new Obj
		obj[ $mol_ambient_ref ] = this.$mol_ambient( overrides )
		return obj
	}

}
