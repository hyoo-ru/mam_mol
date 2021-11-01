namespace $ {
	
	export function $mol_wire_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			get( obj, field ) {
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				return function( this: Host, ... args: any[] ) {
					const fiber = $mol_wire_fiber.make( obj, val, ... args )
					return fiber.sync()
				}
			}
		} ) as any as {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> Promise< infer Res >
				? ( ... args: Args )=> Res
				: Host[ key ]
		}
	}

}
