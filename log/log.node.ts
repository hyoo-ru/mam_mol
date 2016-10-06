module $ {
	
	export function $mol_log( path : string , values : any[] ) {
		
		var filter = $mol_log.filter()
		if( filter == null ) return
		if( path.indexOf( filter ) === -1 ) return
		
		var time = new Date().toLocaleTimeString()
		console.log( time , path , ...values )
	}
	
	export module $mol_log {
		
		var _filter : string
		
		export function filter( ...diff : string[] ) {
			if( diff[ 0 ] !== void 0 ) {
				_filter = diff[ 0 ]
			}
			
			if( _filter !== void 0 ) return _filter
			
			return _filter = null
		}
		
	}
	
}
