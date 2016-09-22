function $mol_log( path : string , values : any[] ) {
	
	var filter = $mol_log.filter()
	if( filter == null ) return
	if( path.indexOf( filter ) === -1 ) return
	
	var time = new Date().toISOString().substring( 11 , 19 )
	console.log( time , path , ...values )
}
module $mol_log {
	
	var _filter : string
	export function filter( ...diff : string[] ) {
		if( diff[0] !== void 0 ) {
			if( diff[0] == null ) {
				sessionStorage.removeItem( '$mol_log.filter()' )
			} else {
				sessionStorage.setItem( '$mol_log.filter()' , diff[ 0 ] )
			}
			_filter = diff[0]
		}
		
		if( _filter !== void 0 ) return _filter
		
		return _filter = sessionStorage.getItem( '$mol_log.filter()' )
	}
	
}


