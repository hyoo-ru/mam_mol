module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		@ $mol_prop()
		checked( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) {
				return this.value() === this.valueSelf() 
			} else {
				return this.value( diff[0] ? this.valueSelf() : null)
			}
		}

	}
}
