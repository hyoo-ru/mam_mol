namespace $ {

	export function $mol_ambient_make< Obj >(
		this : $ ,
		Obj : new( ... args : any[] )=> Obj ,
		overrides : Partial< $ > ,
	) {
		const obj = new Obj
		;( obj as any )[ $mol_ambient_ref ] = this.$mol_ambient( overrides )
		return obj
	}

}
