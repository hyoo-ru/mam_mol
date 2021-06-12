namespace $.$$ {
	
	export class $mol_embed_any extends $.$mol_embed {
		
		Sub() {
			if( this.mime() === 'application/pdf' ) {
				return this.Pdf()
			}
			
			return this.Native()
		}
		
	}
	
}
