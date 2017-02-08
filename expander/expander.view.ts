namespace $.$mol {
	export class $mol_expander extends $.$mol_expander {
		
		rows() {
			return [
				this.Labeler(),
				this.expanded() ? this.Content() : null	
			]
		}
		
	}
}

