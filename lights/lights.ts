namespace $ {
	
	function parse( theme: string | null ) {
		if( theme === 'true' ) return true
		if( theme === 'false' ) return false
		return null
	}
	
	/**
	 * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
	 */
	export function $mol_lights( this : $ , next? : boolean ) {
		
		const arg = parse( this.$mol_state_arg.value( 'mol_lights' ) )
		
		const base = this.$mol_media.match( '(prefers-color-scheme: light)' )
		
		if( next === undefined ) {
			return arg ?? this.$mol_state_local.value< boolean >( '$mol_lights' ) ?? base
		} else {
			if( arg === null ) {
				this.$mol_state_local.value( '$mol_lights' , next === base ? null : next )
			} else {
				this.$mol_state_arg.value( 'mol_lights' , String( next ) )
			}
			return next
		}
		
	}
	
}
