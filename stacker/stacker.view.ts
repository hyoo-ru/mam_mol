module $.$mol {
	export class $mol_stacker extends $.$mol_stacker {

		side( ...diff : boolean[] ) {
			if( !this.main() ) return true
			const args = diff.map( v => v ? '' : null )
			return $mol_state_arg.value( this.stateKey( 'side' ) , ...args ) != null
		}

	}
}
