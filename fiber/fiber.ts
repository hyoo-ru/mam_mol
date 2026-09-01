namespace $ {

	/** @deprecated Use $mol_wire_fiber..plan */
	export function $mol_fiber_defer< Value = void >( calculate : ()=> Value ) {
		const host = {}
		const fiber = new $mol_wire_task( calculate.name, calculate, host, [] )
		fiber.plan()
		return fiber
	}
	
	/** @deprecated Use $mol_wire_async */
	export function $mol_fiber_root<
		Calculate extends ( this : This , ... args : any[] )=> Result ,
		Result = void ,
		This = void ,
	>( calculate : Calculate ) {
		
		const wrapper = function( this: This, ... args : any[] ) {
			const fiber = new $mol_wire_task( this + '.' + calculate.name, calculate, this, args )
			return fiber.async()
		} as any as Calculate
		
		;( wrapper as any )[ Symbol.toStringTag ] = calculate.name
		
		return wrapper
	}

	/** @deprecated Use $mol_wire_sync */
	export function $mol_fiber_sync< Args extends any[] , Value = void , This = void >(
		request : ( this : This , ... args : Args )=> PromiseLike< Value >
	) : ( ... args : Args )=> Value {
		throw new Error( 'Use $mol_wire_sync instead' )
	}
		
	/** @deprecated Use $mol_wire_fiber.sync */
	export async function $mol_fiber_warp() {
		$mol_wire_fiber.sync()
	}
	
	/** @deprecated Don't use that */
	export class $mol_fiber_solid extends $mol_wrapper {

		static func< This , Args extends any[] , Result >( task : ( this : This , ... args : Args )=> Result ) {
			return task
		}

	}
	
	export class $mol_fiber {
		/** @deprecated Use $mol_wire_method */
		static method = $mol_action
	}

}
