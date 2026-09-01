namespace $.$$ {
	export class $mol_form_demo extends $.$mol_form_demo {
		
		name_first( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_first' ) , next ) || ''
		}
		
		name_first_bid() {

			const value = this.name_first()

			if( !value ) return this.message().required
			if( value.indexOf( ' ' ) !== -1 ) return this.message().no_spaces

			return ''
		}
		
		name_nick( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_nick' ) , next ) || ''
		}
		
		name_second( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_second' ) , next ) || ''
		}
		
		name_second_bid() {
			
			const value = this.name_second()
			
			if( value.indexOf( ' ' ) !== -1 ) return this.message().no_spaces
			if( value.length < 3 ) return this.message().need_more_letters.replace( '{count}' , '3' )

			return ''
		}

		mail( next? : string ) {
			return $mol_state_local.value( this.state_key( 'mail' ) , next ) || ''
		}
		
		mail_bid() {
			
			const value = this.mail().trim()
			
			if( !value ) return this.message().required

			const parts = value.split( '@' )

			if( parts.length < 2 ) return this.message().need_at
			if( parts.length > 2 ) return this.message().only_one_at
			
			if( !parts[0] ) return this.message().need_username
			if( parts[1].indexOf( ' ' ) !== -1 ) return this.message().no_space_domain
			const domains = parts[1].split( '.' )

			if( domains.length < 2 ) return this.message().no_tld
			if( !domains.every( Boolean ) ) return this.message().dots_inside

			return ''
		}

		color( next? : string ) {
			return $mol_state_local.value( this.state_key( 'color' ) , next ) || ''
		}

		sex( next? : string ) {
			return $mol_state_local.value( this.state_key( 'sex' ) , next ) || ''
		}

		sex_bid() {
			if( !this.sex() ) return this.message().required
			return ''
		}

		age( next? : number ) {
			return $mol_state_local.value( this.state_key( 'age' ) , next ) || 0
		}

		age_bid() {
			if( this.age() < 18 ) return this.message().adult
			return ''
		}

		signup( next? : Event ) {
			this.result( `Hello, ${this.sex()} ${this.name_first()} (${this.name_nick()}) ${this.name_second()} from  ${this.mail()}!` )
		}
		
	}
}
