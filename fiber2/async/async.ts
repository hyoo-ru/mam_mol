namespace $ {
	
	export function $mol_fiber2_async< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			get( obj, field ) {
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				return function( this: Host, ... args: any[] ) {
					const fiber = $mol_fiber2.make( obj, val, ... args )
					return fiber.async()
				}
			}
		} ) as any as {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> infer Res
				? Res extends Promise<any>
					? Host[ key ]
					: ( ... args: Args )=> Promise< Res >
				: Host[ key ]
		}
	}
	
}
