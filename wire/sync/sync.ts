namespace $ {
	
	export function $mol_wire_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			
			get( obj, field ) {
				
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				
				const temp = $mol_wire_task.getter( val )
				return function $mol_wire_sync( this: Host, ... args: any[] ) {
					const fiber = temp( obj, args )
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
