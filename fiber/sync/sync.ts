namespace $ {

	export function $mol_fiber_sync< Result = void >( handler : ()=> Result ) {
		return $mol_fiber_make( handler ).start()
	}

}
