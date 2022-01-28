namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static now( precision: number, reset?: null ) {
			
			if( precision ) {
				new $mol_after_timeout( precision, ()=> this.now( precision, null ) )
			} else {
				new $mol_after_frame( ()=> this.now( precision, null ) )
			}
		
			return Date.now()
		}
		
	}
	
}
