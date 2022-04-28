namespace $.$$ {
	
	export class $mol_switch extends $.$mol_switch {

		value( next? : any ) {
			return $mol_state_session.value( `${ this }.value()` , next ) ?? ''
		}
		
		option_checked( key : string , next? : boolean ) {
			if( next === undefined ) return this.value() == key
			this.value( next ? key : '' )
			return next
		}

	}

}
