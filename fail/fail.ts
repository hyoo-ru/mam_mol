namespace $ {

	export function $mol_fail_hidden( error : any ) : never {
		throw error /// Use 'Never Pause Here' breakpoint in DevTools
	}

	export function $mol_fail( error : any ) : never {
		throw error
	}

}
