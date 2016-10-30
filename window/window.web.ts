namespace $ {
	
	export class $mol_window extends $mol_object {
		
		@ $mol_mem()
		static size( next? : number[] ) {
			return next || [ window.innerWidth , window.innerHeight ]
		}
		
	}
	
	window.addEventListener( 'resize' , ()=> {
		$mol_window.size( null )
	} )
	
}
