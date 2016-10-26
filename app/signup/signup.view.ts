module $.$mol {
	export class $mol_app_signup extends $.$mol_app_signup {
		
		nameFirst( next? : string ) {
			return $mol_state_local.value( this.stateKey( 'nameFirst' ) , next ) || ''
		}
		
		nameFirstErrors() {
			return this.nameFirst() ? [] : [ 'Input required' ]
		}
		
		nameNick( next? : string ) {
			return $mol_state_local.value( this.stateKey( 'nameNick' ) , next ) || ''
		}
		
		nameSecond( next? : string ) {
			return $mol_state_local.value( this.stateKey( 'nameSecond' ) , next ) || ''
		}
		
		nameSecondErrors() {
			var value = this.nameSecond()
			
			if( value.length === 0 ) return [ 'Input required' ]
			
			var errors : string[] = []
			if( value.length < 3 ) errors.push( 'More then 2 letter required' )
			if( value.indexOf( ' ' ) !== -1 ) errors.push( 'Spaces are forbidden' )
			return errors
		}

		sex( next? : string ) {
			return $mol_state_local.value( this.stateKey( 'sex' ) , next ) || ''
		}

		sexErrors() {
			return this.sex() ? [] : [ 'Input required' ]
		}

		eventSubmit( next? : Event ) {
			alert( `Hello, ${this.sex()} ${this.nameFirst()} (${this.nameNick()}) ${this.nameSecond()}!` )
		}
		
	}
}
