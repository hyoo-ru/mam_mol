namespace $.$mol {
	export class $mol_lister_demo extends $.$mol_lister_demo {
		
		rowers() {
			var next : $mol_viewer[] = []
			for( var id = 0 ; id < 100 ; ++id ) {
				next.push( this.rower( id ) )
			}
			return next
		}
		
		@ $mol_mem_key()
		rower( id : number ) {
			return new $mol_rower_demo().setup( obj => {
				obj.title = ()=> `Title #${id}`
			} )
		}
		
	}
}
