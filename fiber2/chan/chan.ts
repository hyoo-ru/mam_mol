namespace $ {
	
	export function $mol_fiber2_chan<
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( next? : any )=> any >,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	) {

		type Input = $mol_type_param< Prop , 0 >
		type Output = $mol_type_result< Prop >

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( proto , name )
		const orig = descr!.value!
		
		const key = name instanceof Symbol ? name : Symbol( name as string | number )

		;( proto as any )[ key ] = null

		const cached = ( host : Host ): $mol_fiber2< Host, readonly Input[], Output > => {
			
			let cache = ( host as any )[ key ]
			if( cache ) return cache

			let cache2 = new $mol_fiber2( host, orig )
			;( host as any )[ key ] = cache2

			return cache2
		}
		
		function value( this : Host , next? : Input ) {
			
			const cache = cached( this )
			
			if( next === undefined ) {
				return cache.sync()
			}  else {
				const fiber = $mol_fiber2.make( this, orig, next )
				const res = fiber.sync()
				cache.put( res )
				return res
			}
			
		}
		
		const descr2 = { ... descr, value }
		Reflect.defineProperty( proto, name, descr2 )
		
		return descr2

	}

}
