namespace $ {

	export function $mol_fiber_method< Host , Result >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( ... args : any[] )=> Result >
	) {
		descr.value = $mol_fiber_func( descr.value )
	}

}
