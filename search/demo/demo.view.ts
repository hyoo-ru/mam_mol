namespace $.$$ {
	
	export class $mol_search_demo extends $.$mol_search_demo {
		
		@ $mol_mem
		suggests() {
			
			const query = this.query()
			if( !query.length ) return [ 'foo ', 'bar ' ]
			
			this.$.$mol_wait_timeout( 200 )
			
			const length = ( Math.floor( query.length / 10 ) + 1 ) * 10
			return $mol_stub_strings( query, 30, length ).map( v => v + ' ' )
		}
		
	}
	
}
