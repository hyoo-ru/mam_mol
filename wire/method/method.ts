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
		return {
			... descr,
			value: function( this: Host, ... args: Args ) {
				const fiber = $mol_wire_fiber.temp( this ?? null as any, descr.value!, ... args )
				return fiber.sync() as Result
			}
		}
	}
	
}
