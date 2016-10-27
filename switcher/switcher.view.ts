module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		value( next? : any ) {
			return $mol_state_session.value( this.objectPath() + '.value()' , next )
		}
		
		options() : { [ key : string ] : () => string } {
			return {}
		}

		@ $mol_mem()
		items() {
			return Object.keys( this.options() ).map( key => this.optioner( key ) )
		}
		
		optionLabel( key : string ) {
			return this.options()[key]();
		}
		
		optionChecked( key : string , next? : boolean ) {
			if( next === void 0 ) return this.value() === key
			this.value( next ? key : null )
		}

	}
}
