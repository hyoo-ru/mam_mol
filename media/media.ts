namespace $ {
	
	export class $mol_media extends $mol_object2 {
		
		@ $mol_mem_key
		static match( query: string, next?: boolean ) {
			
			if( next !== undefined ) return next
			
			const res = this.$.$mol_dom_context.matchMedia?.( query ) ?? {}
			res.onchange = ()=> this.match( query, res.matches )
			
			return res.matches
		}
		
	}
	
}
