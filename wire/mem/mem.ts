namespace $ {
	
	export let $mol_wire_mem = < Keys extends number >( keys: Keys ) => <
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( ... args: any[] )=> any >,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	)=> {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( proto , name )
		const orig = descr!.value!
		
		function value( this: Host, ... args: any[] ) {
			
			let cache = $mol_wire_fiber.persist( this, orig, ... args.slice( 0, keys ) )
			
			if( args[ keys ] === undefined ) {
				return cache.sync()
			}  else {
				const fiber = $mol_wire_fiber.temp( this, orig, ... args )
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
