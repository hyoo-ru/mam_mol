module $.$mol {
	export class $mol_demo_form extends $.$mol_demo_form {
		
		@ $mol_prop()
		nameFirst( ...diff : string[] ) {
			return this.local( `nameFirst()` , ...diff ) || ''
		}
		
		@ $mol_prop()
		nameNick( ...diff : string[] ) {
			return this.local( `nameNick()` , ...diff ) || ''
		}
		
		@ $mol_prop()
		nameSecond( ...diff : string[] ) {
			return this.local( `nameSecond()` , ...diff ) || ''
		}
		
		@ $mol_prop()
		submits( ...diff : Event[] ) {
			alert( this.nameFirst() + ' (' + this.nameNick() + ') ' + this.nameSecond() )
		}
		
	}
}
