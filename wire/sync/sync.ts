namespace $ {
	const constructors = new WeakMap<Function, Function>()

	function $mol_wire_sync_factory<Args extends unknown[], Result>(
		val: new (...args: Args) => Result
	) {
		let make = constructors.get(val) as null | ((...args: Args) => Result)

		if (! make) {
			make = $mol_func_name_from((...args: Args) => new val(...args), val)

			constructors.set(val, make)
		}

		return make
	}

	/**
	 * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
	 * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
	 */
	export function $mol_wire_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			
			get( obj, field ) {
				
				let val = (obj as any)[ field ]
				if( typeof val !== 'function' ) return val
				const temp = $mol_wire_task.getter(val)
	
				return new Proxy( val, {
					apply( target, self, args ) {
						return temp( obj, args ).sync()
					},
					construct(target, args) {
						const temp = $mol_wire_task.getter($mol_wire_sync_factory(target))
						return temp( obj, args ).sync() as object
					},
					
				})
			},

			construct(obj, args) {
				const temp = $mol_wire_task.getter($mol_wire_sync_factory(obj as new ( ... args: unknown[] )=> unknown))
				return temp( obj, args ).sync() as object
			},

			apply( obj, self, args ) {
				const temp = $mol_wire_task.getter(obj as ( ... args: any[] )=> any)
				return temp(self, args).sync()
			},
			
		} ) as unknown as ObjectOrFunctionResultAwaited<Host>
	}

	export function $mol_wire_sync_make< Constructor extends (new (...args: any[]) => unknown) > (
		obj: Constructor
	) {
		return $mol_wire_sync(obj) as typeof obj
	}

	type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res
		? (...args: Args) => Awaited<Res>
		: Some

	type MethodsResultAwaited<Host extends Object> = {
		[K in keyof Host]: FunctionResultAwaited<Host[K]>
	}

	type ObjectOrFunctionResultAwaited<Some> = (
		Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}
	) & ( Some extends Object ? MethodsResultAwaited<Some> : Some )

}
