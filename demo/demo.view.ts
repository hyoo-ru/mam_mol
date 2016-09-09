module $.$mol {
	export class $mol_demo extends $.$mol_demo {
		
		@ $mol_prop()
		widget() {
			var Class : typeof $mol_viewer = (<any>$)[ this.name() ]
			return new Class()
		}
		
	}
}
