namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static now( precision = 0 ) {
			
			const atom = $mol_wire_auto!
			
			if( precision > 0 ) {
				new $mol_after_timeout( precision, ()=> atom.stale() )
			} else {
				new $mol_after_work( 16, ()=> atom.stale() )
			}
		
			return Date.now()
		}
		
	}
	
}
