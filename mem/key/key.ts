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

		const value = descr.value
		
		const store = new WeakMap< Host , Map< Key , $mol_atom2<Value> > >()

		Object.defineProperty( proto , name + "()" , {
			get : function() {
				return store.get( this )
			}
		} )

		const get_cache = ( host : Host , key : Key )=> {
			
			let dict = store.get( host )
			if( !dict ) store.set( host , dict = new $mol_dict )
			
			let cache = dict.get( key )

			if( !cache ) {
				cache = new $mol_atom2
				cache[ Symbol.toStringTag ] = `${ host }.${ name }(${JSON.stringify(key)})`
				cache.calculate = value.bind( host , key )
				cache.abort = ()=> {
					dict.delete( key )
					if( dict.size === 0 ) store.delete( host )
					cache.forget()
					return true
				}
				$mol_owning_catch( host , cache )
				cache[ $mol_object_field ] = name
				dict.set( key , cache )
			}

			return cache
		}
		
		return {
			
			value( key : Key , next? : Value , force? : $mol_mem_force ) {
				
				if( next === undefined ) {
					const cache = get_cache( this , key )
					if( force === $mol_mem_force_cache ) cache.obsolete()
					return cache.get()
				}
				
				const slave = $mol_fiber.current
				let master = slave && slave.master as $mol_fiber< void >
				if( !master ) {
					
					master = new $mol_fiber
					master.calculate = ()=> {
						if( force !== $mol_mem_force_cache ) next = value.call( this , key , next )
						return get_cache( this , key ).put( next )
					}
					master[ Symbol.toStringTag ] = `${ this }.${ name }(${key},*)`
				}

				return master.get()

			}

		}

	}

}
