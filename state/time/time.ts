namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key()
		static now( precision? : number , next? : number , force? : $mol_atom_force ) {
			
			if( precision > 0 ) {
				setTimeout( () => this.now( precision , undefined , $mol_atom_force ) , precision )
			} else {
				requestAnimationFrame( () => this.now( precision , undefined , $mol_atom_force ) )
			}
			
			return Date.now()
		}
		
	}
	
}
