namespace $ {

	let context = null as null | ( ()=> void )
	export function $mol_log_context( next = context ) {
		return context = next
	}

}
