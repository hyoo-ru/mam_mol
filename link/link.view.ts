namespace $.$$ {
	
	/**
	 * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
	 */
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem
		uri_toggle() {
			return this.current() ? this.uri_off() : this.uri()
		}

		@ $mol_mem
		uri() {
			return new this.$.$mol_state_arg( this.state_key() ).link( this.arg() )
		}

		@ $mol_mem
		uri_off() {
			const arg2: Record<string, string | null> = {}
			for( let i in this.arg() ) arg2[i] = null
			
			return new this.$.$mol_state_arg( this.state_key() ).link( arg2 )
		}
		
		@ $mol_mem
		uri_native() {
			const base = this.$.$mol_state_arg.href()
			return new URL( this.uri() , base )
		}

		@ $mol_mem
		current() {

			const base = this.$.$mol_state_arg.href_normal()
			const target = this.uri_native().toString()

			if( base === target ) return true
			
			const args = this.arg() as Record<string, string>
			
			const keys = Object.keys( args ).filter( key => args[ key ] != null )
			if( keys.length === 0 ) return false

			for( const key of keys ) {
				if( this.$.$mol_state_arg.value( key ) != args[ key ] ) return false
			}

			return true
		}

		file_name() {
			return null as unknown as string
		}

		minimal_height() {
			return Math.max( super.minimal_height(), 24 )
		}
		
		external() {
			return this.uri_native().origin !== $mol_dom_context.location.origin
		}
		
		target(): '_self' | '_blank' | '_top' | '_parent' | string {
			return this.external() ? '_blank' : '_self'
		}

		hint_safe() {
			try {
				return this.hint()
			} catch( error ) {
				$mol_fail_log( error )
				return ''
			}
		}
		
	}
	
}
