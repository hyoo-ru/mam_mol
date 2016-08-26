module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		@ $mol_prop()
		checked( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) {
				return this.value() === this.valueSelf() 
			} else {
				this.value( diff[0] ? this.valueSelf() : null )
				return diff[0]
			}
		}

	}
}
