namespace $.$$ {

	export class $mol_textarea extends $.$mol_textarea {

		text() {
			return this.value().replace( /^/mg , '\t' )
		}

	}

}
