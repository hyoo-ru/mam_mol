namespace $.$$ {
	export class $mol_string_link extends $.$mol_string_link {
		
		@ $mol_mem
		sub() {
			return this.editing() ? [ this.Edit() ] : [ this.View() ]
		}
		
	}
}
