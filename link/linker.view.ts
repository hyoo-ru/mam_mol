namespace $.$mol {
	
	export class $mol_link extends $.$mol_link {
		
		@ $mol_mem()
		uri() {
			const patch : { [ key : string ] : string } = {}
			const arg : any = this.arg()
			for( let key in arg ) patch[ key ] = arg[ key ]()			
			
			return new $mol_state_arg( this.state_prefix() ).link( patch )
		}
		
		current() {
			return this.uri() === $mol_state_arg.link( {} )
		}
		
	}
	
}
