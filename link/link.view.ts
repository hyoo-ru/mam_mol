namespace $.$$ {
	
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem
		uri() {
			return new $mol_state_arg( this.state_key() ).link( this.arg() )
		}

		@ $mol_mem
		current() {
			return this.uri() === $mol_state_arg.href()
		}

		event_click( event? : Event ) {
			setTimeout( $mol_log_group( `${ this }.event_click()` , ()=> this.focused( false ) ) , 50 )
		}

		file_name() {
			return null as string
		}
		
	}
	
}
