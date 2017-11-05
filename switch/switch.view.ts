namespace $.$$ {
	export class $mol_switch extends $.$mol_switch {

		value( next? : any ) {
			return $mol_state_session.value( `${ this }.value()` , next )
		}
		
		options() : { [ key : string ] : string } {
			return {}
		}

		@ $mol_mem
		items() {
			return Object.keys( this.options() ).map( key => this.Option( key ) )
		}
		
		option_title( key : string ) {
			return this.options()[key];
		}
		
		option_checked( key : string , next? : boolean ) {
			if( next === void 0 ) return this.value() == key
			this.value( next ? key : null )
		}
		
	}
}
