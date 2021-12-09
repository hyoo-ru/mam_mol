namespace $ {
	
	export class $mol_window extends $mol_object {
		
		@ $mol_mem
		static size() {
			return {
				width: self.innerWidth,
				height: self.innerHeight,
			}
		}
		
	}

	self.addEventListener( 'resize', ()=> {
		$mol_wire_cache( $mol_window ).size().stale()
	} )
	
}
