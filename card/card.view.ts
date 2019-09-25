namespace $.$$ {

	export class $mol_card extends $.$mol_card {

		rows() {
			return [
				this.Content() ,
				... this.status_text() ? [ this.Status() ] : [],
			]
		}

	}

}
