namespace $.$mol {
	
	export class $mol_checker_expander extends $.$mol_checker_expander {
		
		levelStyle() {
			return `${ this.level() *.75 - 1.5 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
