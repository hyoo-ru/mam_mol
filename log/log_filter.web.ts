namespace $ {
	
	let filter = null as null | string

	export var $mol_log_filter = function $mol_log_filter( next? : null | string ) {

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

	if( typeof sessionStorage === 'undefined' ) $mol_log_filter = ( next = null as null | string )=> filter = next

	if( $mol_log_filter() == null ) console.info( 'Use $mol_log_filter( needle : string|null ) to toggle logs' )
	
}
