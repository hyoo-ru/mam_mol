namespace $ {
	
	function parse( theme: string | null ) {
		if( theme === 'true' ) return true
		if( theme === 'false' ) return false
		return null
	}
	
	export function $mol_lights( this : $ , next? : boolean ) {
		
		const arg = parse( this.$mol_state_arg.value( 'mol_lights' ) )
		
		const base = arg ?? this.$mol_media.match( '(prefers-color-scheme: light)' )
		
		if( next === undefined ) {
			return this.$mol_state_local.value< boolean >( '$mol_lights' ) ?? base
		} else {
			if( arg ) {
				this.$mol_state_arg.value( 'mol_lights' , String( next ) )
			} else {
				this.$mol_state_local.value( '$mol_lights' , next === base ? null : next )
			}
			return next
		}
		
	}
	
}
