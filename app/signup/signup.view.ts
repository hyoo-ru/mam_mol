namespace $.$mol {
	export class $mol_app_signup extends $.$mol_app_signup {
		
		name_first( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_first' ) , next ) || ''
		}
		
		name_first_errors() {
			return this.name_first() ? [] : [ this.message_required() ]
		}
		
		name_nick( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_nick' ) , next ) || ''
		}
		
		name_second( next? : string ) {
			return $mol_state_local.value( this.state_key( 'name_second' ) , next ) || ''
		}
		
		name_second_errors() {
			const value = this.name_second()
			
			if( value.length === 0 ) return [ this.message_required() ]
			
			const errors : string[] = []
			if( value.length < 3 ) errors.push( this.message_need_more_letters() )
			if( value.indexOf( ' ' ) !== -1 ) errors.push( this.message_no_spaces() )
			return errors
		}

		sex( next? : string ) {
			return $mol_state_local.value( this.state_key( 'sex' ) , next ) || ''
		}

		sex_errors() {
			return this.sex() ? [] : [ this.message_required() ]
		}

		event_submit( next? : Event ) {
			alert( `Hello, ${this.sex()} ${this.name_first()} (${this.name_nick()}) ${this.name_second()}!` )
		}
		
		submit_blocked() {
			return this.Form().submit_blocked()
		}

	}
}
