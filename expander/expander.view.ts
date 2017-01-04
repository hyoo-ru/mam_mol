namespace $.$mol {
	export class $mol_expander extends $.$mol_expander {
		
		rowers() {
			return [
				this.labeler(),
				this.expanded() ? this.content() : null	
			]
		}
		
	}
}

