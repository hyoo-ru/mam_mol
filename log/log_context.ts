namespace $ {

	let context : ()=> void = null
	export function $mol_log_context( next = context ) {
		return context = next
	}

}
