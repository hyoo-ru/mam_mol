namespace $ {

	export function $mol_mem_key<
		Host extends object ,
		Field extends keyof Host ,
		Key ,
		Value ,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< ( key : Key , next? : Value , force? : $mol_mem_force )=> Value >
	) : any {

		const value = descr!.value!
		
		const store = new WeakMap< Host , Map< Key , $mol_atom2<Value> > >()

		Object.defineProperty( proto , name + "()" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host , key : Key )=> {
			
			let dict = store.get( host )!
			if( !dict ) store.set( host , dict = new $mol_dict )
			
			let cache = dict.get( key )
			if( cache ) return cache

			let cache2 = new $mol_atom2
			cache2[ Symbol.toStringTag ] = `${ host }.${ name }(${JSON.stringify(key)})`
			cache2.calculate = value.bind( host , key )
			cache2.abort = ()=> {
				dict.delete( key )
				if( dict.size === 0 ) store.delete( host )
				cache2.forget()
				return true
			}
			$mol_owning_catch( host , cache2 )
			cache2[ $mol_object_field ] = name
			dict.set( key , cache2 )

			return cache2
		}
		
		return {
			
			value( key : Key , next? : Value , force? : $mol_mem_force ) {
				
				if( next === undefined ) {
					
					const cache = get_cache( this , key )
					if( force === $mol_mem_force_cache ) return cache.obsolete()

					if( $mol_atom2.current ) return cache.get()
					else return $mol_fiber.run( ()=> cache.get() )

				}
				
				return $mol_fiber.run( ()=> {
					
					if( force === $mol_mem_force_fail ) return get_cache( this , key ).fail( next as any )
					if( force !== $mol_mem_force_cache ) next = value.call( this , key , next )
					return get_cache( this , key ).put( next )
					
				} )

			}

		}

	}

}
