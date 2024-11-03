namespace $ {
	
	/**
	 * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
	 * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
	 */
	export function $mol_wire_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			
			get( obj, field ) {
				
				const val = (obj as any)[ field ]
				if( typeof val !== 'function' ) return val
				
				const temp = $mol_wire_task.getter( val )
				return function $mol_wire_sync( this: Host, ... args: any[] ) {
					const fiber = temp( obj, args )
					return fiber.sync()
				}
				
			},

			construct(constr, args) {
				const obj = (...args: unknown[]) => new (constr as new(...args: unknown[]) => any)(...args)
				const temp = $mol_wire_task.getter( obj )
				const fiber = temp( constr, args )
				return fiber.sync()
			},
			
			apply( obj, self, args ) {
				const temp = $mol_wire_task.getter( obj as ( ... args: any[] )=> any )
				const fiber = temp( self, args )
				return fiber.sync()
			},
			
		} ) as unknown as ObjectOrFunctionResultAwaited<Host>
	}

	type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res
		? (...args: Args) => Awaited<Res>
		: Some

	type MethodsResultAwaited<Host extends Object> = {
		[K in keyof Host]: FunctionResultAwaited<Host[K]>
	}

	type ConstructorResultAwaited<Some> = Some extends (new (...args: infer Args) => infer Res)
		? new (...args: Args) => Awaited<Res>
		: Some

	type ObjectOrFunctionResultAwaited<Some> = (
		Some extends new (...args: unknown[]) => unknown
			? ConstructorResultAwaited<Some>
			: Some extends (...args: unknown[]) => unknown
				? FunctionResultAwaited<Some>
				: {}
	) & ( Some extends Object ? MethodsResultAwaited<Some> : Some )

}
