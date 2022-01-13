namespace $ {
	
	export function $mol_wire_method<
		Host extends object,
		Args extends readonly any[],
		Result,
	>(
		host : Host,
		field : PropertyKey,
		descr : TypedPropertyDescriptor< ( ... args: Args )=> Result >,
	) {
		
		const orig = descr!.value!
		
		const sup = Reflect.getPrototypeOf( host )!	
		if( typeof sup[ field as any ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ field as any ].name } )
		}
		
		const value = function( this: Host, ... args: Args ) {
			const fiber = $mol_wire_fiber.temp( this ?? null as any, descr.value!, ... args )
			return fiber.sync() as Result
		}
		
		Object.defineProperty( value , 'name' , { value : orig.name + '@' } )
		
		Object.assign( value, { orig } )
		const descr2 = { ... descr, value }
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2
		
	}
	
}
