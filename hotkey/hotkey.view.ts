namespace $.$$ {
	/**
	 * Plugin which adds handlers for keyboard keys.
	 * @deprecated Use $mol_hotkey2
	 * @see [mol_keyboard_code](../keyboard/code/code.ts)
	 */
	export class $mol_hotkey extends $.$mol_hotkey {

		@ $mol_mem
		action() {
			
			const prefix = [ ... new Set([
				... this.mod_ctrl() ? [ 'ctrl_' ] : [],
				... this.mod_alt() ? [ 'alt_' ] : [],
				... this.mod_shift() ? [ 'shift_' ] : [],
			]) ].join( '' )
			
			return Object.fromEntries(
				Object.entries( this.key() )
					.map( ([ key, val ])=>[ prefix + key, val ] )
			)
			
		}
		
	}
}
