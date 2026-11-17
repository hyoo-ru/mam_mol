namespace $ {
	
	/**
	 * Disable reaping of current subscriber
	 */
	export function $mol_wire_solid() {
		let current = $mol_wire_auto() as $mol_wire_fiber< any, any, any >
		if( current!.temp ) current = current!.host
		if( current!.reap !== nothing ) {
			current?.sub_on( sub, sub.data.length )
		}
		current!.reap = nothing
		
		const host = current!.host
		if( Object( host ) !== host ) return
		
		let atoms = solids.get( host )
		if( !atoms ) solids.set( host, atoms = new Set )
		atoms.add( current )
	}
	
	/**
	 * Destroy all solid fibers of host
	 */
	export function $mol_wire_solid_free( host: object ) {
		const atoms = solids.get( host )
		if( !atoms ) return
		
		solids.delete( host )
		for( const atom of atoms ) atom.destructor()
	}
	
	const nothing = ()=> {}
	const sub = new $mol_wire_pub_sub
	const solids = new WeakMap< object, Set< $mol_wire_fiber< any, any, any > > >()
	
}
