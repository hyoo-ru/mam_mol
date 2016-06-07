module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		@ $mol_prop()
		valueChanged( ...diff : string[] ) {
			return this.focused() ? void 0 : this.value()
		}
		
		changes( ...diff : Event[] ) {
			this.value( diff[0].srcElement.textContent.trim() )
		}
		
	}
}
