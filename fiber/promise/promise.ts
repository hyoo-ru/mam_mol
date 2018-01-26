namespace $ {

	export function $mol_fiber_promise< Result >( start : () => Promise< Result > ) {
		
		const fiber = $mol_fiber_make( ()=> {

			start()
			.then( result => fiber.done( result ) )
			.catch( error => fiber.fail( error ) )

			throw $mol_fiber_wait

		} )
		
		return fiber.start()
	}

}
