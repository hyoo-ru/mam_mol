namespace $.$mol {
	export class $mol_list_demo extends $.$mol_list_demo {
		
		rows() {
			var next : $mol_view[] = []
			for( var id = 0 ; id < 100 ; ++id ) {
				next.push( this.rower( id ) )
			}
			return next
		}
		
		@ $mol_mem_key()
		rower( id : number ) {
			return new $mol_row_demo().setup( obj => {
				obj.title = ()=> `Title #${id}`
			} )
		}
		
	}
}
