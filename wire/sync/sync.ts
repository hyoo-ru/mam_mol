namespace $ {
	const factories = new WeakMap<Function, Function>()

	function factory<Args extends unknown[], Result>(
		val: new (...args: Args) => Result
	) {
		let make = factories.get(val) as null | ((...args: Args) => Result)

		if ( make ) return make

		make = $mol_func_name_from((...args: Args) => new val(...args), val)
		factories.set(val, make)

		return make
	}

	const getters = new WeakMap<Object, Record<string | symbol, (next?: unknown) => unknown>>()

	function get_prop(
		host: Object,
		field: string | symbol,
	) {
		let props = getters.get(host)
		let get_val = props?.[field]

		if ( get_val ) return get_val

		get_val = (next?: unknown) => {
			if (next !== undefined) host[field as keyof typeof host] = next as any

			return host[field as keyof typeof host]
		}

		Object.defineProperty( get_val , 'name' , { value : field } )

		if (! props) {
			props = {}
			getters.set(host, props)
		}
		props[field] = get_val

		return get_val
	}

	/**
	 * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
	 * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
	 */
	export function $mol_wire_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			
			get( obj, field ) {
				
				let val = (obj as any)[ field ]
				const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field))

				if (typeof val !== 'function') return temp( obj, [] ).sync()

				return function $mol_wire_sync( this: Host, ... args: unknown[] ) {
					const fiber = temp( obj, args )
					return fiber.sync()
				}
			},

			set( obj, field, next) {
				const temp = $mol_wire_task.getter(get_prop(obj, field))
				temp( obj, [ next ] ).sync()

				return true
			},

			construct(obj, args) {
				const temp = $mol_wire_task.getter(factory(obj as (new ( ... args: unknown[] )=> unknown)))
				return temp( obj, args ).sync() as object
			},

			apply( obj, self, args ) {
				const temp = $mol_wire_task.getter(obj as ( ... args: any[] )=> any)
				return temp(self, args).sync()
			},
			
		} ) as unknown as ObjectOrFunctionResultAwaited<Host>
	}

	type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res
		? (...args: Args) => Awaited<Res>
		: Some

	type ConstructorResultAwaited<Some> = Some extends new (...args: infer Args) => infer Res
		? new (...args: Args) => Res
		: {}

	type MethodsResultAwaited<Host extends Object> = {
		[K in keyof Host]: FunctionResultAwaited<Host[K]>
	}

	type ObjectOrFunctionResultAwaited<Some> = (
		Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}
	) & ( Some extends Object ? MethodsResultAwaited<Some> & ConstructorResultAwaited<Some> : Some )

}
