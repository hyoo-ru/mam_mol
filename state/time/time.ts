namespace $ {
	
	/** State of time moment */
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static task( precision: number, reset?: null ): $mol_after_timeout | $mol_after_frame {
			
			if( precision ) {
				return new $mol_after_timeout( precision, ()=> this.task( precision, null ) )
			} else {
				return new $mol_after_frame( ()=> this.task( precision, null ) )
			}
		
		}
		
		@ $mol_mem_key
		static now( precision: number ) {
			this.task( precision )
			return Date.now()
		}
		
	}
	
}
