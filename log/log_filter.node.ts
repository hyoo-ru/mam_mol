namespace $ {

	let filter : ()=> void
	export function $mol_log_filter( next = filter ) {
		return filter = next
	}

}
