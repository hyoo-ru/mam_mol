namespace $ {
	
	/** Transition atom value */
	export function $mol_wire_easing( next: any ) {
		
		const atom = $mol_wire_auto()
		if(!( atom instanceof $mol_wire_atom )) $mol_fail( new Error( 'Allowed only inside atom' ) )

		const prev = atom.result() ?? next
		if( typeof prev !== 'number' ) return next
		
		const current = ( prev * 2 + next  ) / 3
	
		const diff = Math.abs( current - next )
		if( diff < 1 ) return next
	
		$mol_state_time.now(0)
	
		return current
	}
	
}
