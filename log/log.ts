function $mol_log( ...values : any[] ) {
	if( !$mol_log.enabled ) return
    console.log.apply( console , values )
    return values[0]
}
module $mol_log {
	export var enabled = false
}

$jin2_log /// fake dependency
