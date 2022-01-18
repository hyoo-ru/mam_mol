namespace $ {
	
	export class $mol_window extends $mol_object {
		
		@ $mol_mem
		static size() {
			this.resizes()
			return {
				width: self.innerWidth,
				height: self.innerHeight,
			}
		}
		
		@ $mol_mem
		static resizes( next?: Event ) { return next }
		
	}

	self.addEventListener( 'resize', event => $mol_window.resizes( event ) )
	
}
