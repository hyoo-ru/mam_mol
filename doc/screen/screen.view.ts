module $.$mol {
	export class $mol_doc_screen extends $.$mol_doc_screen {
		
		@ $mol_prop()
		widget() {
			var Class = $[ this.name() ]
			return new Class()
			// .setup( obj => {
			// 	obj.argument = () => this.argument().sub( name )
			// } )
		}
		
	}
}
