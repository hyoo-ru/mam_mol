namespace $ {
	
	/** Reactive memoizing multiplexed property decorator. */
	export function $mol_wire_plex< Args extends [ any, ... any[] ] >(
		host: object,
		field: string,
		descr?: TypedPropertyDescriptor< ( ... args: Args )=> any >
	) {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field )
		const orig = descr?.value! ?? (host as any)[ field ]
		
		const sup = Reflect.getPrototypeOf( host )!
		if( typeof (sup as any)[ field ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : (sup as any)[ field ].name } )
		}
		
		const descr2 = {
			... descr,
			value: function( this: typeof host, ... args: Args ) {
			
				let atom = $mol_wire_atom.plex( this, orig, args[0] )
				
				if(( args.length === 1 )||( args[1] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto()?.temp ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )	
			}
		}
		
		Reflect.defineProperty( descr2.value , 'name' , { value : orig.name + ' ' } )
		Reflect.defineProperty( descr2.value , 'length' , { value : orig.length } )
		Object.assign( descr2.value, { orig } )
		
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2
	}
	
}
