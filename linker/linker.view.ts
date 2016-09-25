module $.$mol {
	
	export class $mol_linker extends $.$mol_linker {
		
		@ $mol_prop()
		uri() {
			return new $mol_state_arg( this.statePrefix() ).link( this.patch() )
		}
		
		current() {
			return this.uri() === $mol_state_arg.link( {} )
		}
		
	}
	
}
