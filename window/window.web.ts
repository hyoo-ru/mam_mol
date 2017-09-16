namespace $ {
	
	export class $mol_window extends $mol_object {
		
		@ $mol_mem
		static size( next? : {
			width : number
			height : number
		} ) {
			return next || {
				width : window.innerWidth ,
				height : window.innerHeight ,
			}
		}
		
	}
	
	window.addEventListener( 'resize' , ()=> {
		$mol_window.size( null )
	} )
	
}
