function $mol_log( ...values : any[] ) {
	if( !$mol_log.enabled ) return
	var date = new Date
	console.log( date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() , ...values )
	return values[0]
}
module $mol_log {
	export var enabled = false
}

$jin2_log /// fake dependency
