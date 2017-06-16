namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key()
		static now( precision : number , next? : number , force? : $mol_atom_force ) {
			setTimeout( () => $mol_state_time.now( precision , undefined , $mol_atom_force ) , precision )
			return Date.now()
		}
	
	}
	
}
