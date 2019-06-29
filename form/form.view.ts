namespace $.$$ {
	export class $mol_form extends $.$mol_form {
		
		@ $mol_mem
		submit_blocked( ) {
			return this.form_fields().some( field => field.bid() )
		}

		keydown( next? : KeyboardEvent ) {
			if( next.ctrlKey && next.keyCode === $mol_keyboard_code.enter && !this.submit_blocked() ) this.submit( event )
		}
		
	}
}
