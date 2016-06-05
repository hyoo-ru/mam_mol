function $mol_log( ...values : any[] ) {
	var filter = $mol_log.filter() 
	if( !filter || !filter.test( values[0] ) ) return
	var date = new Date
	console.log( date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() , ...values )
	return values[0]
}
module $mol_log {
	export function filter( ...diff : RegExp[] ) {
		if( diff.length ) sessionStorage[ '$mol_log.filter()' ] = diff[0].source
		return RegExp( sessionStorage[ '$mol_log.filter()' ] || '^$' , 'i' )
	}
}

$jin2_log /// fake dependency
