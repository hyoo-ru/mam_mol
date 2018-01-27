namespace $ {

	export function $mol_fiber_async< Result = void >(
		request : (
			back : (
				response :  ( ... args : any[] )=> Result
			)=> ( ... args : any[] )=> Result
		)=> PromiseLike< Result > | void
	) {
		const fiber = $mol_fiber_make< Result >( ()=> {

			const promise = request( response => ( ... args : any[] )=> {
				try {
					return fiber.done( response( ... args ) )
				} catch( error ) {
					fiber.fail( error )
				}
			} )

			if( promise && typeof promise.then === 'function' ) {
				promise.then(
					result => fiber.done( result ) ,
					error => fiber.fail( error ) ,
				)
			}
			
			throw $mol_fiber_wait
		} )
		
		return fiber.start()
	}

}
