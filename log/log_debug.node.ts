namespace $ {

	let debug : ()=> void
	export function $mol_log_debug( next = debug ) {
		return debug = next
	}

}
