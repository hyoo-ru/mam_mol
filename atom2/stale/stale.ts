namespace $ {

	export function $mol_atom2_stale() {

		const atom = $mol_fiber.current
		if(!( atom instanceof $mol_atom2 )) throw new Error( 'Called not in $mol_atom2' )
		
		return ()=> {
			if( atom.cursor === $mol_fiber_status.obsolete ) return

			atom.cursor = $mol_fiber_status.obsolete
			atom.schedule()
		}

	}

}
