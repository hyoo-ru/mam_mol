namespace $.$$ {
	
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem
		uri() {
			return new this.$.$mol_state_arg( this.state_key() ).link( this.arg() )
		}

		@ $mol_mem
		current() {

			const base = this.$.$mol_state_arg.href()
			const target = new URL( this.uri() , base ).toString()

			if( base === target ) return true
			
			const args = this.arg()
			
			const keys = Object.keys( args ).filter( key => args[ key ] != null )
			if( keys.length === 0 ) return false

			for( const key of keys ) {
				if( this.$.$mol_state_arg.value( key ) !== args[ key ] ) return false
			}

			return true
		}

		event_click( event? : Event ) {
			if( !event || event.defaultPrevented ) return
			this.focused( false )
			// setTimeout( $mol_log_group( `${ this }.event_click()` , ()=> this.focused( false ) ) , 50 )
		}

		file_name() {
			return null as unknown as string
		}

		minimal_height() {
			return Math.max( super.minimal_height() || 40 )
		}

		theme() {
			return this.current() ? '$mol_theme_base' : null
		}
		
	}
	
}
