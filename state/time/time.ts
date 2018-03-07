namespace $ {
	
	export class $mol_state_time extends $mol_object {
		
		@ $mol_mem_key
		static now( precision? : number , next? : number ) {
			
			const atom = $mol_atom2.current
			
			if( precision > 0 ) {
				setTimeout( ()=> atom.obsolete() , precision )
			} else {
				requestAnimationFrame( ()=> atom.obsolete() )
			}
		
			return Date.now()
		}
		
	}
	
}
