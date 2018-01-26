namespace $ {

	export function $mol_fiber_func< Handler extends ( ... args : any[] )=> Result , Result = void >( handler : Handler ) {
		return function $mol_fiber_func_wrapper( ... args : any[] ) {
			return $mol_fiber_make( handler.bind( this , ... args ) as ()=> Result ).start()
		} as Handler
	}

}
