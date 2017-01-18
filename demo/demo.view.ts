namespace $.$mol {
	export class $mol_demo extends $.$mol_demo {
		
		@ $mol_mem()
		widget() {
			var Class : typeof $mol_view = (<any>$)[ `$${ this.name() }` ]
			return new Class()
		}
		
		title() {
			return `$${ this.name() }`
		}
		
	}
}
