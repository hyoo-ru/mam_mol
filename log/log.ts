function $mol_log( path : string , values : any[] ) {
	var filter = $mol_log.filter() 
	if( !filter || !filter.test( path ) ) return
	var date = new Date
	console.log( date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() , path , ...values )
	return path
}
module $mol_log {
	var _filter : RegExp
	export function filter( ...diff : RegExp[] ) {
		if( diff.length ) {
			sessionStorage[ '$mol_log.filter()' ] = diff[0].source
			_filter = diff[0]
		}
		
		if( _filter ) return _filter
		
		var source = sessionStorage[ '$mol_log.filter()' ]
		if( !source ) return null
		
		return _filter = RegExp( source , 'i' )
	}
}

$jin2_log /// fake dependency
