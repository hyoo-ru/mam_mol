module $.$mol {
	export class $mol_lister_demo extends $.$mol_lister_demo {
		
		rows() {
			// return [ this.rower(0) , this.rower(1) , this.rower(2) ]
			return $mol_range({
				value : id => this.rower( id ) ,
				count : () => 1000 ,
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
