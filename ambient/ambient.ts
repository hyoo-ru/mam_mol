namespace $ {

	export const $mol_ambient_ref : unique symbol = Symbol( '$mol_ambient_ref' )

	/** @deprecated use $ instead */
	export type $mol_ambient_context = $

	export function $mol_ambient( this : $ | void , overrides : Partial< $ > ) : $ {
		return Object.setPrototypeOf( overrides , this || $ )
	}

}
