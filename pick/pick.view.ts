namespace $.$$ {
	export class $mol_pick extends $.$mol_pick {
		
		keydown( event : KeyboardEvent ) {
			
			if( !this.trigger_enabled() ) return

			if( event.defaultPrevented ) return 
			
			if( event.keyCode === $mol_keyboard_code.escape ) {
				if( !this.showed() ) return
				event.preventDefault()
				this.showed( false )
			}
			
		}
		
	}
}
