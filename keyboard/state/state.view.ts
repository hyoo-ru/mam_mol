namespace $.$$ {
	export class $mol_keyboard_state extends $.$mol_keyboard_state {

		key() {
			return super.key() as {
				[ key in keyof typeof $mol_keyboard_code ]?: ( state?: boolean )=> boolean
			}
		}
		
		down( event?: KeyboardEvent ) {

			if( !event ) return
			if( event.defaultPrevented ) return

			let name = $mol_keyboard_code[ event.keyCode ] as keyof typeof $mol_keyboard_code
			
			const handle = this.key()[ name ]
			if( handle ) handle( true )

		}
		
		up( event?: KeyboardEvent ) {

			if( !event ) return
			if( event.defaultPrevented ) return

			let name = $mol_keyboard_code[ event.keyCode ] as keyof typeof $mol_keyboard_code
			
			const handle = this.key()[ name ]
			if( handle ) handle( false )

		}
		
	}
}
