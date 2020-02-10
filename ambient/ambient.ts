namespace $ {

	export namespace $$ { export let $$ : typeof $ }

	export const $mol_ambient_ref : unique symbol = Symbol( '$mol_ambient_ref' )

	export type $mol_ambient_context = ( typeof globalThis ) & ( typeof $.$$ ) & ( typeof $ )

	export function $mol_ambient( this : $mol_ambient_context | void , overrides : Partial< $mol_ambient_context > ) : $mol_ambient_context {
		return Object.setPrototypeOf( overrides , this || $ )
	}

}
