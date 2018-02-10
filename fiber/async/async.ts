namespace $ {

	export function $mol_fiber_async< Result = void >(
		request : (
			back : (
				response :  ( ... args : any[] )=> Result
			)=> ( ... args : any[] )=> Result
		)=> PromiseLike< Result > | { (): any } | void
	) {

		const fiber = $mol_fiber_make< Result >( ()=> {

			const res = request( response => ( ... args : any[] )=> {
				
				if( !fiber.masters ) return

				try {
					return fiber.done( response( ... args ) )
				} catch( error ) {
					fiber.fail( error )
				}

			} )

			if( res ) {

				if( typeof res === 'function' ) {

					fiber.abort = res
				
				} else if( typeof res.then === 'function' ) {

					res.then(
						result => fiber.done( result ) ,
						error => fiber.fail( error ) ,
					)

				}
			}
			
			throw $mol_fiber_wait
		} )
		
		return fiber.start()
	}

}
