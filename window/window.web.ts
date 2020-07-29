namespace $ {
	
	export class $mol_window extends $mol_object {
		
		@ $mol_mem
		static size( next? : {
			width : number
			height : number
		} , force? : $mol_mem_force ) {
			return next || {
				width : self.innerWidth ,
				height : self.innerHeight ,
			}
		}
		
	}

	const $mol_window_resize = ()=> {
		$mol_window.size( undefined , $mol_mem_force_cache )
	}
	
	self.addEventListener( 'resize' , $mol_fiber_root( $mol_window_resize ) )
	
}
