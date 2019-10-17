namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static now( precision = 0 , next? : number ) {
			
			if( precision > 0 ) {
				new $mol_after_timeout( precision , $mol_atom2.current!.fresh )
			} else {
				new $mol_after_frame( $mol_atom2.current!.fresh )
			}
		
			return Date.now()
		}
		
	}
	
}
