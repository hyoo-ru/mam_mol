namespace $.$$ {
	
	export class $mol_search_demo extends $.$mol_search_demo {
		
		@ $mol_mem
		suggests() {
			
			const query = this.query()
			if( query.length < 2 ) return []
			
			this.$.$mol_wait_timeout( 500 )
			
			return $mol_stub_strings( query , 30 )
		}
		
	}
	
}
