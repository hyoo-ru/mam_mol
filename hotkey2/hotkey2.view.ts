namespace $.$$ {
	/**
	 * Plugin which adds handlers for keyboard keys.
	 * @see [mol_keyboard_code](../keyboard/code/code.ts)
	 */
	export class $mol_hotkey2 extends $.$mol_hotkey2 {

		keydown( event? : KeyboardEvent ) {
			
			if( !event ) return
			if( event.defaultPrevented ) return
			
			const key = [ ... new Set([
				... ( event.ctrlKey || event.metaKey ) ? [ 'ctrl' ] : [],
				... event.altKey ? [ 'alt' ] : [],
				... event.shiftKey ? [ 'shift' ] : [],
				$mol_keyboard_code[ event.keyCode ] ?? '?',
			]) ].join( '_' )
			
			this.action()[ key ]?.( event )

		}
		
	}
}
