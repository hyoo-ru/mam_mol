namespace $ {
	
	/** Returns proxy that converts all synchronous methods (that can access to fibers) to asynchronous (that returns a Promise). */
	export function $mol_wire_async< Host extends object >( obj: Host ) {
		
		let fiber: $mol_wire_fiber< any, any, any >
		const temp = $mol_wire_task.getter( obj as ( ... args: any[] )=> any )
		
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
				
			},
			
			apply( obj, self, args ) {
				fiber?.destructor()
				fiber = temp( self, args )
				return fiber.async()
			},
			
		} ) as any as (
			Host extends ( ... args: infer Args )=> infer Res
				? Res extends Promise<any>
					? Host
					: ( ... args: Args )=> Promise< Res >
				: {}
		) & {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> infer Res
				? Res extends Promise<any>
					? Host[ key ]
					: ( ... args: Args )=> Promise< Res >
				: Host[ key ]
		}
		
	}
	
}
