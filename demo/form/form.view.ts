module $.$mol {
	export class $mol_demo_form extends $.$mol_demo_form {
		
		@ $mol_prop()
		nameFirst( ...diff : string[] ) {
			return this.local( `nameFirst()` , ...diff ) || ''
		}
		
		nameFirstErrors() {
			return this.nameFirst() ? [] : [ 'Input required' ]
		}
		
		@ $mol_prop()
		nameNick( ...diff : string[] ) {
			return this.local( `nameNick()` , ...diff ) || ''
		}
		
		nameNickErrors() {
			return this.nameNick() ? [] : [ 'Input required' ]
		}
		
		@ $mol_prop()
		nameSecond( ...diff : string[] ) {
			return this.local( `nameSecond()` , ...diff ) || ''
		}
		
		nameSecondErrors() {
			return this.nameSecond() ? [] : [ 'Input required' ]
		}
		
		@ $mol_prop()
		submits( ...diff : Event[] ) {
			alert( this.nameFirst() + ' (' + this.nameNick() + ') ' + this.nameSecond() )
		}
		
	}
}
