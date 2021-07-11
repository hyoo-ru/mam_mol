namespace $ {
	
	export class $mol_media extends $mol_object2 {
		
		@ $mol_mem_key
		static match( query: string ) {
			const res = this.$.$mol_dom_context.matchMedia( query )
			res.onchange = ()=> $mol_mem_cached(
				()=> this.match( query ),
				res.matches,
			)
			return res.matches
		}
		
	}
	
}
