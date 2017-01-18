namespace $.$mol {
	
	export class $mol_check_expand extends $.$mol_check_expand {
		
		level_style() {
			return `${ this.level() * .75 - .75 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
