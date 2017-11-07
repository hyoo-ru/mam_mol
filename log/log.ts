namespace $ {

	export function $mol_log( path : any , ... values : any[] ) {
		
		if( $mol_log_filter() == null ) return
		
		path = String( path )
		if( path.indexOf( $mol_log_filter() ) === -1 ) return
		
		if( $mol_log_context() ) $mol_log_context()()
		
		console.debug( path , ... values )

		if( $mol_log_debug() == null ) return
		if( path.indexOf( $mol_log_debug() ) === -1 ) return
		
		debugger
	}
	
}
