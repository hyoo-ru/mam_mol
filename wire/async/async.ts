namespace $ {
	
	export function $mol_wire_async< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			
			get( obj, field ) {
				
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				
				let fiber: $mol_wire_fiber< any, any, any >
				const temp = $mol_wire_task.getter( val ) 
				
				return function $mol_wire_async( this: Host, ... args: any[] ) {
					
					fiber?.destructor()
					
					fiber = temp( obj, args )
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
