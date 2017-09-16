namespace $.$$ {
	export class $mol_form extends $.$mol_form {
		
		@ $mol_mem
		submit_blocked( ) {
			return this.form_fields().some( field => field.errors().length !== 0 )
		}
		
	}
}
