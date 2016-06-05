module $.$mol {
	export class $mol_form extends $.$mol_form {
		
		@ $mol_prop()
		submitAllow( ) {
			return this.formFields().every( field => field.errors().length === 0 )
		}
		
	}
}
