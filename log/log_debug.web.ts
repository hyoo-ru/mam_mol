namespace $ {
	
	export function $mol_log_debug( next? : string ) {

		if( next !== undefined ) {
			if( next == null ) {
				sessionStorage.removeItem( '$mol_log_debug()' )
			} else {
				sessionStorage.setItem( '$mol_log_debug()' , next )
			}
		}
		
		return sessionStorage.getItem( '$mol_log_debug()' )
	}

}
