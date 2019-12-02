namespace $.$$ {
	
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem
		uri() {
			return new this.$.$mol_state_arg( this.state_key() ).link( this.arg() )
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
			if( !event || event.defaultPrevented ) return
			this.focused( false )
			// setTimeout( $mol_log_group( `${ this }.event_click()` , ()=> this.focused( false ) ) , 50 )
		}

		file_name() {
			return null as unknown as string
		}
		
	}

	$mol_style_define( $mol_link , {
		
		textDecoration: 'none',
		color: $mol_theme.control,
		stroke: 'currentColor',
		cursor: 'pointer',
		padding: '.5rem',
		boxSizing: 'border-box',
		position: 'relative',

		':hover': {
			backgroundColor: $mol_theme.hover,
		},

		':focus': {
			outline: 'none',
			backgroundColor: $mol_theme.hover,
		},

		'@': {
			mol_link_current: {
				'true': {
					backgroundColor: $mol_theme.current,
					color: $mol_theme.text,				
				}
			}
		},

	} )
	
}
