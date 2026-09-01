namespace $ {

	let filter : null | string
	export var $mol_log_filter = function $mol_log_filter( next = filter ) {
		return filter = next
	}

}
