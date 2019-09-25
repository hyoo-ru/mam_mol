namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static now( precision? : number , next? : number , force? : $mol_atom_force ) {
			
			const atom = $mol_atom_current()
			const handler = () => {
				atom['value()'] = Date.now()
				atom.obsolete_slaves()
				if( precision > 0 ) {
					setTimeout( handler , precision )
				} else {
					requestAnimationFrame( handler )
				}
			}

			handler()
			
			return Date.now()
		}
		
	}
	
}
