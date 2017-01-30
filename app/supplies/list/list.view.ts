namespace $.$mol {
	export class $mol_app_supplies_list extends $.$mol_app_supplies_list {
		
		@ $mol_mem()
		supply_rows() {
			return this.supplies().map( ( supply , index ) => this.Supply_row( index ) )
		}
		
		@ $mol_mem_key()
		Supply_row( index : number ) {
			return new $mol_app_supplies_card().setup( obj => {
				obj.supply = ()=> this.supplies()[ index ]
				obj.arg = ()=> ({
					supply : this.supplies()[ index ].id() ,
					side : <string> null ,
				})
			} )
		}
		
	}
}
