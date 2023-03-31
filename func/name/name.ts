namespace $ {
	
	const named = new WeakSet< Function >()
	
	export function $mol_func_name( this : $ , func : Function ) : string {
		
		let name = func.name
		if( name?.length > 1 ) return name
		if( named.has( func ) ) return name

		for( let key in this ) {
			try {
				if( (this as any)[ key ] !== func ) continue
				name = key
				Object.defineProperty( func , 'name' , { value : name } )
				break
			} catch {}
		}

		named.add( func )
		return name
		
	}

	export function $mol_func_name_from< Target extends Function >( target : Target , source : Function ) {
		Object.defineProperty( target , 'name' , { value : source.name } )
		return target
	}

}
