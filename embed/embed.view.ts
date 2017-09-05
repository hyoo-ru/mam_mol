namespace $.$$ {
	
	export class $mol_embed extends $.$mol_embed {
		
		Sub() {
			if( this.mime() === 'application/pdf' ) {
				return this.Pdf()
			}
			
			return this.Native()
		}
		
	}
	
}
