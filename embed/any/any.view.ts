namespace $.$$ {
	
	export class $mol_embed_any extends $.$mol_embed_any {
		
		@ $mol_mem
		type() {
			
			try {
				if( /\.(png|gif|jpg|jpeg|webp|svg)$/.test( this.uri() ) ) return 'image'
			} catch( error ) {
				$mol_fail_log( error )
				return 'image'
			}
			
			return 'object'
		}
		
		@ $mol_mem
		Sub() {
			switch( this.type() ) {
				case 'image': return this.Image()
				default: return this.Object()
			}
		}
		
	}
	
}
