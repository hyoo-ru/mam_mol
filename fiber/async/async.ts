namespace $ {

	export function $mol_fiber_async< Result = void >(
		handler : ( back : ( callback :  ( ... args : any[] )=> Result )=> ( ... args : any[] )=> Result )=> void
	) {
		return $mol_fiber_make( ()=> {
			const fiber = $mol_fiber.current

			handler( callback => ( ... args : any[] )=> {
				try {
					return fiber.done( callback( ... args ) )
				} catch( error ) {
					fiber.fail( error )
				}
			} )
			
			throw $mol_fiber_wait
		} ).start()
	}

}
