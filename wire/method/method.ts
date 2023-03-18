namespace $ {
	
	/**
	 * Decorates method to fiber to ensure it is executed only once inside other fiber.
	 */
	export function $mol_wire_method<
		Host extends object,
		Args extends readonly any[],
	>(
		host : Host,
		field : PropertyKey,
		descr? : TypedPropertyDescriptor< ( ... args: Args )=> any >,
	) {
		
		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field ) as any
		const orig = descr?.value! ?? host[ field ]
		
		const sup = Reflect.getPrototypeOf( host )!	
		if( typeof sup[ field as any ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ field as any ].name } )
		}
		
		const temp = $mol_wire_task.getter( orig )
		const value = function( this: Host, ... args: Args ) {
			const fiber = temp( this ?? null as any, args )
			return fiber.sync()
		}
		
		Object.defineProperty( value , 'name' , { value : orig.name + ' ' } )
		
		Object.assign( value, { orig } )
		const descr2 = { ... descr, value }
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2
		
	}
	
}
