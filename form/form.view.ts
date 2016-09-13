module $.$mol {
	export class $mol_form extends $.$mol_form {
		
		@ $mol_prop()
		submitBlocked( ) {
			return this.formFields().some( field => field.errors().length !== 0 )
		}
		
	}
}
