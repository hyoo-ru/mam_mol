namespace $ {
	
	export function $mol_func_name( func : Function ) : string {
		return func.name
	}

	export function $mol_func_name_from< Target extends Function >( target : Target , source : Function ) {
		Object.defineProperty( target , 'name' , { value : source.name } )
		return target
	}

}
