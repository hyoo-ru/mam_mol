namespace $ {
	
	export function $mol_func_name( this : $mol_ambient_context , func : Function ) : string {
		
		let name = func.name
		if( name?.length > 1 ) return name

		for( let key in this ) {
			try {
				if( this[ key ] !== func ) continue
				name = key
				Object.defineProperty( func , 'name' , { value : name } )
				break
			} catch {}
		}

		return name
	}

	export function $mol_func_name_from< Target extends Function >( target : Target , source : Function ) {
		Object.defineProperty( target , 'name' , { value : source.name } )
		return target
	}

}
