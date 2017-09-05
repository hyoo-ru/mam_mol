namespace $.$$ {
	
	export class $mol_check_expand extends $.$mol_check_expand {
		
		level_style() {
			return `${ this.level() * 1.25 - .5 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
