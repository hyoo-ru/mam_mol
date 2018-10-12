namespace $ {

	export let $mol_fail_catched = new WeakSet< any >()

	export function $mol_fail_hidden( error : any ) : never {
		throw error /// Use 'Never Pause Here' breakpoint in DevTools
	}

}
