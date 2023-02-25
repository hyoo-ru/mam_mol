namespace $.$$ {
	export class $mol_expander extends $.$mol_expander {
		
		@ $mol_mem
		rows() {
			return [
				this.Label(),
				... this.expanded() ? [ this.Content() ] : []
			]
		}
		
		expandable() {
			return this.content().length > 0
		}
		
	}
}

