namespace $.$$ {
	export class $mol_app_signup extends $.$mol_app_signup {
		
		name_first( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_first' ) , next ) || ''
		}
		
		name_first_bid() {
			if( !this.name_first() ) return this.message_required()
		}
		
		name_nick( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_nick' ) , next ) || ''
		}
		
		name_second( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_second' ) , next ) || ''
		}
		
		name_second_bid() {
			const value = this.name_second()
			
			if( value.length === 0 ) return this.message_required()
			if( value.indexOf( ' ' ) !== -1 ) return this.message_no_spaces()
			if( value.length < 3 ) return this.message_need_more_letters()
		}

		sex( next? : string ) {
			return $mol_state_local.value( this.state_key( 'sex' ) , next ) || ''
		}

		sex_bid() {
			if( !this.sex() ) return this.message_required()
		}

		event_submit( next? : Event ) {
			alert( `Hello, ${this.sex()} ${this.name_first()} (${this.name_nick()}) ${this.name_second()}!` )
		}
		
		submit_blocked() {
			return this.Form().submit_blocked()
		}

	}
}
