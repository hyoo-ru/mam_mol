namespace $ {

	export function $mol_atom2_prop<
		Host extends object ,
		Field extends keyof Host ,
		Value ,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< ( next? : Value )=> Value >
	) : any {

		const value = descr.value
		
		const store = new WeakMap< Host , $mol_fiber< Value > >()

		Object.defineProperty( proto , name + "()" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host )=> {
			
			let cache = store.get( host )
			
			if( !cache ) {
				cache = new $mol_atom2
				cache.calculate = value.bind( host )
				cache[ Symbol.toStringTag ] = `${ host }.${ name }()`
				store.set( host , cache )
			}

			return cache
		}
		
		return {
			
			value( next? : Value ) {
				
				const slave = $mol_fiber.current 
				
				if( next === undefined ) {
				
					const master = get_cache( this )

					if( slave ) slave.master = master
					
					return master.get()

				} else {
					
					let master = slave && slave.master as $mol_fiber< void >
					if( !master ) {
						
						master = new $mol_fiber
						master.calculate = ()=> {
							next = value.call( this , next )
							get_cache( this ).push( next )
						}
						master[ Symbol.toStringTag ] = `${ this }.${ name }(*)`
					}

					if( slave ) slave.master = master

					master.get()
				}

			}

		}

	}

}
