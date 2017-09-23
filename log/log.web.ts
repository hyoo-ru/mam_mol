namespace $ {
	
	export function $mol_log( path : any , ... values : any[] ) {
		
		var filter = $mol_log.filter()
		if( filter == null ) return
		
		path = String( path )
		if( path.indexOf( filter ) === -1 ) return
		
		console.debug( path , ... values )

		var debug = $mol_log.debug()
		if( debug == null ) return
		if( path.indexOf( debug ) === -1 ) return
		
		debugger
	}
	
	export namespace $mol_log {
		
		var _filter : string
		
		export function filter( next? : string ) {
			if( next !== void 0 ) {
				if( next == null ) {
					sessionStorage.removeItem( '$mol_log.filter()' )
				} else {
					sessionStorage.setItem( '$mol_log.filter()' , next )
				}
				_filter = next
			}
			
			if( _filter !== void 0 ) return _filter
			
			return _filter = sessionStorage.getItem( '$mol_log.filter()' )
		}

		var _debug : string

		export function debug( next = _debug ) {
			return _debug = next
		}
		
	}
	
}
