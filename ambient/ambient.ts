namespace $ {

	export const $mol_ambient_ref : unique symbol = Symbol( '$mol_ambient_ref' )

	/** @deprecated use $ instead */
	export type $mol_ambient_context = $

	export function $mol_ambient( this : $ | void , overrides : Partial< $ > ) : $ {
		const context = Object.setPrototypeOf( overrides , this || $ ) as $
		context.$mol_static = context.$mol_static_create()
		context.$mol_single = context.$mol_single_create()
		return context
	}

}
