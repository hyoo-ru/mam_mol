namespace $.$$ {

	/**
	 * Password input field
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_password_demo
	 */
	export class $mol_password extends $.$mol_password {

		@ $mol_mem
		checked( next?: boolean ) {
			this.type( next ? 'text' : 'password' )
			return next ?? false
		}
		
	}

}
