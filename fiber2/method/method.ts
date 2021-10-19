namespace $ {
	
	export function $mol_fiber2_method<
		Host extends object,
		Args extends any[],
		Result,
	>(
		host : Host,
		field : PropertyKey,
		descr : TypedPropertyDescriptor< ( ... args: Args )=> Result >,
	) {
		return {
			... descr,
			value: function( this: Host, ... args: Args ) {
				const fiber = $mol_fiber2.make( this ?? null as any, descr.value!, ... args )
				return fiber.sync() as Result
			}
		}
	}
	
}
