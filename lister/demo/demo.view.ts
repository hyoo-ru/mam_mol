module $.$mol {
	export class $mol_lister_demo extends $.$mol_lister_demo {
		
		rows() {
			return new $mol_range_lazy({
				get : id => this.rower( id ) ,
				length : 1000 ,
			})
		}
		
		@ $mol_prop()
		rower( id : number ) {
			return new $mol_rower_demo().setup( obj => {
				obj.hint = ()=> `Title #${id}`
			} )
		}
		
	}
}
