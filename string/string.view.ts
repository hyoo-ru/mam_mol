namespace $.$$ {
	export class $mol_string extends $.$mol_string {
		
		_timer = 0
		
		event_change( next? : Event ) {
			if( !next ) return
			
			clearTimeout( this._timer )
			this._timer = setTimeout( $mol_log_group( `${ this }.event_change()` , () => {
				this.value( ( next.target as HTMLInputElement ).value ) 
			} ) , this.debounce() )
		}
		
		event_key_press( next? : KeyboardEvent ) { 
			if( !next ) return
			
			if( next.keyCode === $mol_keyboard_code.enter ) {
				this.value( ( next.target as HTMLInputElement ).value )
			}
		} 
		
		disabled() {
			return !this.enabled()
		}
	}
}
