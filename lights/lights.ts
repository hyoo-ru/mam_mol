namespace $ {
	
	function parse( theme: string | null ) {
		if( theme === 'on' ) return true
		if( theme === 'off' ) return false
		return null
	}
	
	export function $mol_lights( this : $ , next? : boolean ) {
		
		const base = null
			?? parse( this.$mol_state_arg.value( 'mol_lights' ) )
			?? this.$mol_media.match( '(prefers-color-scheme: light)' )
		
		if( next === undefined ) {
			return this.$mol_state_local.value< boolean >( '$mol_lights' ) ?? base
		} else {
			this.$mol_state_local.value( '$mol_lights' , next === base ? null : next )
			return next
		}
		
	}
	
}
