namespace $ {
	
	export function $mol_wire_plex< Args extends any[] >(
		host: object,
		field: string,
		descr: TypedPropertyDescriptor< ( ... args: Args )=> any >
	) {

		const orig = descr.value!
		
		const sup = Reflect.getPrototypeOf( host )!
		if( typeof sup[ field ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ field ].name } )
		}
		
		const descr2 = {
			... descr,
			value: function( this: typeof host, ... args: Args ) {
			
				let atom = $mol_wire_atom.plex( this, orig, args[0] )
				
				if(( args.length === 1 )||( args[1] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto() instanceof $mol_wire_task ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )	
			}
		}
		
		Reflect.defineProperty( descr2.value , 'name' , { value : orig.name + ' ' } )
		Object.assign( descr2.value, { orig } )
		
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2 as Guard< Args, typeof descr >
	}

	type Guard< Args extends any[], Val >
		
		= unknown extends Args[0]
		? Val
		
		: undefined extends Args[0]
		? $mol_type_error< "Key can't be optional. Make it required or use solo channel.", Args >
		
		: Val
	
}
