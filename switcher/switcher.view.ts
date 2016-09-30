module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		value( ...diff : any[] ) {
			return $mol_state_session.value( this.objectPath() + '.value()' , ...diff )
		}
		
		options() : { [ key : string ] : () => string } {
			return {}
		}

		@ $mol_prop()
		items() {
			return Object.keys( this.options() ).map( key => this.optioner( key ) )
		}
		
		optionLabel(key : string) {
			return this.options()[key]();
		}
		
		optionChecked( key : string , ...diff : boolean[] ) {
			if( diff[0] === void 0) return this.value() === key
			this.value( diff[0] ? key : null )
		}

	}
}
