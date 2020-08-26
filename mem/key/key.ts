namespace $ {

	export function $mol_mem_key<
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( id : any , next? : any )=> any >,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	) : any {

		type Key = $mol_type_param< Prop , 0 >
		type Input = $mol_type_param< Prop , 1 >
		type Output = $mol_type_result< Prop >

		const value = descr!.value!
		
		const store = new WeakMap< Host , Map< Key , $mol_atom2<Output> > >()

		Object.defineProperty( proto , name + "()" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host , key : Key )=> {
			
			let dict = store.get( host )!
			if( !dict ) store.set( host , dict = new $mol_dict )
			
			const key_str = $mol_dict_key(key)
			let cache = dict.get( key_str )
			if( cache ) return cache

			let cache2 = new $mol_atom2
			cache2[ Symbol.toStringTag ] = `${ host }.${ name }(${key_str})`
			cache2.calculate = value.bind( host , key )
			cache2.abort = ()=> {
				dict.delete( key_str )
				if( dict.size === 0 ) store.delete( host )
				cache2.forget()
				return true
			}
			$mol_owning_catch( host , cache2 )
			cache2[ $mol_object_field ] = name
			dict.set( key_str , cache2 )

			return cache2
		}
		
		return {
			
			value( key : Key , next? : Input , force? : $mol_mem_force ) {
				
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
