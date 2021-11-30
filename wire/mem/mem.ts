namespace $ {
	
	export function $mol_wire_mem_cache_reset< Host extends object >( host: Host ) {
		return $mol_wire_mem_cache( host, undefined )
	}
	
	export function $mol_wire_mem_cache< Host extends object, Result >( host: Host, next?: Result ) {
		
		const push = arguments.length > 1
		
		return new Proxy( host, {
			get( obj, field ) {
				
				const val = obj[ field ]
				if( typeof val?.orig !== 'function' ) return val
				
				return function( this: Host, ... args: any[] ) {
					
					const fiber = $mol_wire_fiber.persist( obj, val.orig, ... args )
					
					if( push ) {
						
						if( next === undefined ) fiber.stale()
						else fiber.put( next )
						
						return next
						
					} else {
						
						return fiber?.cache
						
					}
					
				}
				
			}
		} )
		
	}
	
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
			
			let atom = $mol_wire_fiber.persist( this, orig, ... args.slice( 0, keys ) )
			
			let res = atom.sync()
			if( args[ keys ] === undefined ) return res
			
			const fiber = $mol_wire_fiber.temp( this, orig, ... args )
			res = fiber.sync()
			atom.put( res )
			
			return res
		}
		
		$mol_func_name_from( value, orig )
		
		Object.assign( value, { orig } )
		const descr2 = { ... descr, value }
		Reflect.defineProperty( proto, name, descr2 )
		
		return descr2

	}

}
