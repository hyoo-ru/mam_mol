namespace $.$$ {

	/**
	 * Represents a common card. It can has several statuses at bottom line.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_card_demo/readme
	 */
	export class $mol_card extends $.$mol_card {

		rows() {
			return [
				this.Content() ,
				... this.status_text() ? [ this.Status() ] : [],
			]
		}

	}

}
