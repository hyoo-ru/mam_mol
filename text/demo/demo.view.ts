namespace $.$$ {
	
	export class $mol_text_demo extends $.$mol_text_demo {
		
		edit() {
			return this.$.$mol_state_arg.value( 'edit' ) !== null
		}
		
		@ $mol_mem
		pages() {
			return [
				this.View_page(),
				... this.edit() ? [ this.Code_page() ] : [], 
			]
		}
		
	}
	
}
