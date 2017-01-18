namespace $.$mol {
	
	export class $mol_suggest_demo_base extends $.$mol_suggest_demo_base {
		
		@ $mol_mem()
		query_suggests() {
			return $mol_stub_strings( this.query() , 30 )
		}
	}
	
}
