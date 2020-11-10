namespace $ {

	export function $mol_define< Sup >( sup : new()=> Sup ) {
		
		return <
			Field extends keyof Proto ,
			Proto extends {} ,
		>(
			proto : Proto ,
			field : Field extends keyof Sup ? $mol_type_error< 'Accidental redefine' > : Field,
			descr? : TypedPropertyDescriptor< Proto[ Field ] > ,
		)=> descr

	}

}
