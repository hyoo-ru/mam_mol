namespace $.$$ {
	
	export class $mol_embed_any extends $.$mol_embed_any {
		
		@ $mol_mem
		type() {
			
			try {
				
				const uri = this.uri()
				
				if( /\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test( uri ) ) return 'image'
				if( /^https:\/\/www\.youtube\.com\//.test( uri ) ) return 'youtube'
				if( /^https:\/\/youtu\.be\//.test( uri ) ) return 'youtube'
				if( /^https:\/\/rutube\.ru\//.test( uri ) ) return 'rutube'
				
			} catch( error ) {
				$mol_fail_log( error )
				return 'image'
			}
			
			return 'object'
		}
		
		@ $mol_mem
		sub() {
			switch( this.type() ) {
				case 'image': return [ this.Image() ]
				case 'youtube': return [ this.Youtube() ]
				case 'rutube': return [ this.Rutube() ]
				default: return [ this.Object() ]
			}
		}
		
	}
	
}
