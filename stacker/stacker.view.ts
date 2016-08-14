module $.$mol {
	export class $mol_stacker extends $.$mol_stacker {

		@ $mol_prop()
		addonerFocused( ...diff : boolean[] ) {
			if( !this.main() ) return true
			this.argument().link({})
			return diff[0] || false
		}

		mainerFocused( ...diff : boolean[] ) {
			return !this.addonerFocused( ...diff.map( v => !v ) )
		}

	}
}

module $.$mol {
	export class $mol_stacker_panel extends $.$mol_stacker_panel {

		eventFocus( ...diff : Event[] ) {
			this.focused( true )
		}

	}
}
