namespace $ {

    export type $mol_ambient_context = ( typeof $ ) & ( typeof $.$$ ) & Window & { Promise : PromiseConstructor }

	export function $mol_ambient( overrides : Partial< $mol_ambient_context > ) : $mol_ambient_context {
		return Object.setPrototypeOf( overrides , this )
    }
    
}
