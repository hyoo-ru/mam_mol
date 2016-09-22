module $.$mol {
	export class $mol_switcher extends $.$mol_switcher {

		@ $mol_prop()
		value( ...diff : any[] ) {
			return this.session( 'value()' , ...diff )
		}
		
		options() : { [ key : string ] : () => string } {
			return {}
		}

		@ $mol_prop()
		items() {
			return Object.keys( this.options() ).map( key => this.optioner( key ) )
		}
		
		@ $mol_prop()
		optioner( key : string ) {
			return new $mol_checker().setup( obj => {
				obj.checked = ( ...diff )=> this.optionChecked( key , ...diff )
				obj.label = ()=> this.options()[ key ]()
			} )
		}
		
		optionChecked( key : string , ...diff : boolean[] ) {
			if( diff[0] === void 0) return this.value() === key
			this.value( diff[0] ? key : null )
		}

	}
}
