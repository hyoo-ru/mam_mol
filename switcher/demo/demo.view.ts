module $.$mol {
	export class $mol_switcher_demo extends $.$mol_switcher_demo {

		@ $mol_prop()
		color( ...diff : string[] ) {
			if( diff[0] === void 0 ) return 'red'
			return diff[0]
		}
	
	}
}
