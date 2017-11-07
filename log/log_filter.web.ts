namespace $ {
	
	let filter : string
	export function $mol_log_filter( next? : string ) {

		if( next !== undefined ) {
			if( next == null ) {
				sessionStorage.removeItem( '$mol_log_filter()' )
			} else {
				sessionStorage.setItem( '$mol_log_filter()' , next )
			}

			filter = next
		}

		if( filter !== undefined ) return filter
		
		return filter = sessionStorage.getItem( '$mol_log_filter()' )
	}

}
