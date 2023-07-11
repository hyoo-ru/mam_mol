namespace $ {
	
	/** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
	export function $mol_wire_solo< Args extends any[] >(
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
			value: function( this: typeof host, ... args: Args ){
			
				let atom = $mol_wire_atom.solo( this, orig )
				
				if(( args.length === 0 )||( args[0] === undefined )) {
					
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
		
		return descr2 as any as TypedPropertyDescriptor< ( ... args: First_optional< Args > )=> any >
	}

	type First_optional< Args extends any[] > =  Args extends []
		? []
		: [ Args[0] | undefined, ... $mol_type_tail< Args > ]

}
