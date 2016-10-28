module $.$mol {
	
	export class $mol_linker extends $.$mol_linker {
		
		@ $mol_mem()
		uri() {
			const patch : { [ key : string ] : string } = {}
			const arg : any = this.arg()
			for( let key in arg ) patch[ key ] = arg[ key ]()			
			
			return new $mol_state_arg( this.statePrefix() ).link( patch )
		}
		
		current() {
			return this.uri() === $mol_state_arg.link( {} )
		}
		
	}
	
}
