namespace $.$$ {
	export class $mol_app_supplies_list extends $.$mol_app_supplies_list {
		
		@ $mol_mem
		supply_rows() {
			return this.supplies().map( ( supply , index ) => this.Supply_row( index ) )
		}
		
		supply( index : number ) {
			return this.supplies()[ index ]
		}
		
		supply_id( index : number ) {
			return this.supplies()[ index ].id()
		}
		
	}
}
