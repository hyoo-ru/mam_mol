module $.$mol {
	export class $mol_stacker extends $.$mol_stacker {

		@ $mol_prop()
		side( ...diff : boolean[] ) {
			if( !this.main() ) return true
			return Boolean( this.argument().value( 'side' , ...diff ) )
		}

	}
}
