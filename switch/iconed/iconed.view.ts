namespace $.$$ {
	
	/**
	 * Buttons which switching the state
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_switch_demo
	 */
	export class $mol_switch_iconed extends $.$mol_switch_iconed {

		value( next? : string ) {
			return $mol_state_session.value( `${ this }.value()` , next ) ?? ''
		}
		
		option_checked( key : string , next? : boolean ) {
			if( next === undefined ) return this.value() == key
			this.value( next ? key : '' )
			return next
		}

	}

}
