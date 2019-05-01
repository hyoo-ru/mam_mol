namespace $ {

	export namespace $$ { export let $$ : typeof $ }

	export type $mol_ambient_context = Window & {
		Promise : PromiseConstructor
		Math : Math
		XMLHttpRequest : typeof XMLHttpRequest
	} & ( typeof $.$$ ) & ( typeof $ )

	export function $mol_ambient( this : $mol_ambient_context , overrides : Partial< $mol_ambient_context > ) : $mol_ambient_context {
		return Object.setPrototypeOf( overrides , this )
    }
    
}
