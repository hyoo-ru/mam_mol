namespace $ {

	export let $mol_mem_cached = $mol_atom2_value

	export function $mol_mem_persist() {

		const atom = $mol_atom2.current
		if( !atom ) return
		
		if( atom.hasOwnProperty( 'destructor' ) ) return
		
		atom.destructor = ()=> {}
		
	}

	export function $mol_mem<
		Host extends object ,
		Field extends keyof Host ,
		Value ,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< ( next? : Value , force? : $mol_mem_force )=> Value >
	) : any {

		const value = descr!.value!
		
		const store = new WeakMap< Host , $mol_atom2< Value > >()

		Object.defineProperty( proto , name + "()" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host )=> {
			
			let cache = store.get( host )!
			if( cache ) return cache

			let cache2 = new $mol_atom2
			cache2.calculate = value.bind( host )
			cache2[ Symbol.toStringTag ] = `${ host }.${ name }()`
			cache2.abort = ()=> {
				store.delete( host )
				cache2.forget()
				return true
			}
			$mol_owning_catch( host , cache2 )
			cache2[ $mol_object_field ] = name
			store.set( host , cache2 )

			return cache2
		}
		
		return {

			... descr || {} ,
			
			value( this : Host , next? : Value , force? : $mol_mem_force ) {
				
				if( next === undefined ) {
					
					const cache = get_cache( this )
					if( force === $mol_mem_force_cache ) return cache.obsolete( Number.NaN )
					
					if( $mol_atom2.current ) return cache.get()
					else return $mol_fiber.run( ()=> cache.get() )
				
				}
				
				return $mol_fiber.run( ()=> {
					if( force === $mol_mem_force_fail ) return get_cache( this ).fail( next as any )
					if( force !== $mol_mem_force_cache ) next = value.call( this , next )
					return get_cache( this ).put( next )
				} )
				
			}

		}

	}
	
}
