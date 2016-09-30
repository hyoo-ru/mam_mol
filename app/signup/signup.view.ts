module $.$mol {
	export class $mol_app_signup extends $.$mol_app_signup {
		
		nameFirst( ...diff : string[] ) {
			return $mol_state_local.value( this.stateKey( 'nameFirst' ) , ...diff ) || ''
		}
		
		nameFirstErrors() {
			return this.nameFirst() ? [] : [ 'Input required' ]
		}
		
		nameNick( ...diff : string[] ) {
			return $mol_state_local.value( this.stateKey( 'nameNick' ) , ...diff ) || ''
		}
		
		nameSecond( ...diff : string[] ) {
			return $mol_state_local.value( this.stateKey( 'nameSecond' ) , ...diff ) || ''
		}
		
		nameSecondErrors() {
			var value = this.nameSecond()
			
			if( value.length === 0 ) return [ 'Input required' ]
			
			var errors : string[] = []
			if( value.length < 3 ) errors.push( 'More then 2 letter required' )
			if( value.indexOf( ' ' ) !== -1 ) errors.push( 'Spaces are forbidden' )
			return errors
		}

		sex( ...diff : string[] ) {
			return $mol_state_local.value( this.stateKey( 'sex' ) , ...diff ) || ''
		}

		sexErrors() {
			return this.sex() ? [] : [ 'Input required' ]
		}

		eventSubmit( ...diff : Event[] ) {
			alert( `Hello, ${this.sex()} ${this.nameFirst()} (${this.nameNick()}) ${this.nameSecond()}!` )
		}
		
	}
}
