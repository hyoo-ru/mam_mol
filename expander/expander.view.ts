namespace $.$$ {
	export class $mol_expander extends $.$mol_expander {
		
		rows() {
			return [
				this.Label(),
				... this.expanded() ? [ this.Content() ] : []
			]
		}
		
	}
}

