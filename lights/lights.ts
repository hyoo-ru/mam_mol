namespace $ {
	export function $mol_lights( this : $mol_ambient_context , next? : boolean ) {
		return this.$.$mol_state_local.value( '$mol_lights' , next )
		?? $mol_dom_context.matchMedia('(prefers-color-scheme: light)').matches
	}
}
