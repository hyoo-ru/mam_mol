namespace $.$$ {
	export class $mol_button_open_native extends $.$mol_button_open_native {
		
		dom_node() {
			return super.dom_node() as HTMLInputElement
		}
		
		picked() {
			
			const files = this.dom_node().files
			if( !files || !files.length ) return
			
			this.files([ ... files ])
			
		}
		
	}
}
