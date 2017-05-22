namespace $.$mol {
	
	export class $mol_embed extends $.$mol_embed {
		
		render() {
			if( this.mime() === 'application/pdf' ) {
				return this.Pdf().render()
			}
			
			return this.Native().render()
		}
		
	}
	
}
