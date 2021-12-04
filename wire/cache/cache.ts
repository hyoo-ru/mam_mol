namespace $ {
	
	export function $mol_wire_cache< Host extends object >( host: Host ) {
		
		return new Proxy( host, {
			get: ( obj, field )=>
				( ... args: any[] )=>
					$mol_wire_fiber.persist( obj, obj[ field ].orig, ... args )
		} ) as any as {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> any
				? ( ... args: Args )=> $mol_wire_fiber< Host, Args, ReturnType< Host[ key ] > >
				: never
		}
		
	}

}
