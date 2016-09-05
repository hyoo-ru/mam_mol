module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		@ $mol_prop()
		value( ...diff : any[] ) {
			return diff[0]
		}
		
		@ $mol_prop()
		items() {
			return this.option_keys().map( key => this.optioner( key ) )
		}
		
		@ $mol_prop()
		optioner( key : string ) {
			return new $mol_checker().setup( obj => {
				obj.checked = ( ...diff )=> this.optionChecked( key , ...diff )
				obj.label = ()=> this.option( key )
			} )
		}
		
		optionChecked( key : string , ...diff : boolean[] ) {
			if( diff[0] === void 0) return this.value() === key
			this.value( diff[0] ? key : null )
		}

	}
}
