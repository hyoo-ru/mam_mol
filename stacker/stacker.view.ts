namespace $.$mol {
	export class $mol_stacker extends $.$mol_stacker {

		side( next? : boolean ) {
			if( !this.main() ) return true
			return $mol_state_arg.value( this.stateKey( 'side' ) , next ? '' : null ) != null
		}

	}
}
