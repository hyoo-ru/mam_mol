namespace $.$$ {

	export class $mol_password extends $.$mol_password {

		@ $mol_mem
		checked( next?: boolean ) {
			this.type( next ? 'text' : 'password' )
			return next ?? false
		}
		
	}

}
