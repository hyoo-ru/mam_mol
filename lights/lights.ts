namespace $ {
	
	function parse( theme: string | null ) {
		if( theme === 'on' ) return true
		if( theme === 'off' ) return false
		return null
	}
	
	export function $mol_lights( this : $ , next? : boolean ) {
		return this.$mol_state_local.value( '$mol_lights' , next )
		?? parse( this.$mol_state_arg.value( 'mol_lights' ) )
		?? $mol_dom_context.matchMedia('(prefers-color-scheme: light)').matches
	}
	
}
