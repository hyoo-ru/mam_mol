namespace $ {
	
	/** Derived debuggable error with stack */
	export function $mol_crypto_restack( error: any ): never {
		error = new Error( error instanceof Error ? error.message : String( error ), { cause: error } )
		$mol_fail_hidden( error )
	}
	
}
