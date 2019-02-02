namespace $.$$ {
	
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem
		uri() {
			return new $mol_state_arg( this.state_key() ).link( this.arg() )
		}

		@ $mol_mem
		current() {

			if( this.uri() === this.$.$mol_state_arg.href() ) return true
			
			const args = this.arg()
			
			const keys = Object.keys( args ).filter( key => args[ key ] != null )
			if( keys.length === 0 ) return false

			for( const key of keys ) {
				if( this.$.$mol_state_arg.value( key ) !== args[ key ] ) return false
			}

			return true
		}

		event_click( event? : Event ) {
			setTimeout( $mol_log_group( `${ this }.event_click()` , ()=> this.focused( false ) ) , 50 )
		}

		file_name() {
			return null as string
		}
		
	}
	
}
