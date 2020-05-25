namespace $.$$ {
	export class $mol_hotkey extends $.$mol_hotkey {

		key() {
			return super.key() as {
				[ key in keyof typeof $mol_keyboard_code ]? : ( event : KeyboardEvent )=> void
			}
		}
		
		keydown( event? : KeyboardEvent ) {

			if( !event ) return
			if( event.defaultPrevented ) return

			let name = $mol_keyboard_code[ event.keyCode ] as keyof typeof $mol_keyboard_code
			
			if( this.mod_ctrl() && !event.ctrlKey ) return
			if( this.mod_alt() && !event.altKey ) return
			if( this.mod_shift() && !event.shiftKey ) return
			
			const handle = this.key()[ name ]
			if( handle ) handle( event )

		}
		
	}
}
