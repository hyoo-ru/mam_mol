namespace $ {
	export function $mol_wire_stale< Res >( task: ()=> Res ): Res | undefined {
		
		try {
			return task()
		} catch( error ) {
			
			if( ! $mol_promise_like( error ) ) return $mol_fail_hidden( error )
			
			const fiber = $mol_wire_auto()
			if(!( fiber instanceof $mol_wire_fiber )) return
			
			return $mol_wire_probe( ()=> fiber.result() )
			
		}
		
	}
}
