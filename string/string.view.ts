namespace $.$$ {
	export class $mol_string extends $.$mol_string {
		
		_timer = 0
		
		event_change( next? : Event ) {
			if( !next ) return
			
			const val = ( next.target as HTMLInputElement ).value.trim()
			
			clearTimeout( this._timer )
			this._timer = setTimeout( () => this.value( val ) , this.debounce() )
		}
		
		event_key_press( next? : KeyboardEvent ) { 
			if( !next ) return
			
			if( next.keyCode === $mol_keyboard_code.enter ) {
				this.value( ( next.target as HTMLInputElement ).value.trim() )
			}
		} 
		
		disabled() {
			return !this.enabled()
		}
	}
}
