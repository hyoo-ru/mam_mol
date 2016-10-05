module $.$mol {
	export class $mol_expander extends $.$mol_expander {
		
		childs() {
			return [
				this.header(),
				this.expanded() ? this.content() : null
			];
		}
		
		eventExpand() {
			this.expanded(true);
		}
		
	}
}

