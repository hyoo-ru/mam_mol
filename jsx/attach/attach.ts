namespace $ {

	export function $mol_jsx_attach< Result >( next : typeof $mol_jsx_document , action : ()=> Result ) {
		const prev = $mol_jsx_document
		try {
			$mol_jsx_document = next
			return action()
		} finally {
			$mol_jsx_document = prev
		}
	}

}
