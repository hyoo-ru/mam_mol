namespace $ {

	export function $mol_fiber_make< Result = void >( handler : ()=> Result ) {
		let master = $mol_fiber.current && $mol_fiber.current.master as $mol_fiber< Result >
		if( master ) return master 
		
		return new $mol_fiber< Result >( handler , $mol_fiber.current )
	}

}
