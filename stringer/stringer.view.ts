module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		@ $mol_prop()
		valueChanged( ...diff : string[] ) {
			var value = this.value( ...diff )
			var focused = this.focused()
			return focused ? diff[0] : value
		}
		
		changes( ...diff : Event[] ) {
			this.valueChanged( ( diff[0].srcElement as HTMLInputElement ).value.trim() )
		}
		
	}
}
