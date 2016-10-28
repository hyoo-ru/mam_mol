namespace $.$mol {
	
	export class $mol_statuser extends $.$mol_statuser {
		
		message() {
			try {
				this.status()
				return null
			} catch( error ) {
				if( error instanceof $mol_atom_wait ) throw error
				return error.message
			}
		}
		
	}
	
}
