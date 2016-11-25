namespace $.$mol {
	export class $mol_grider_demo extends $.$mol_grider_demo {
		
		@ $mol_mem()
		rows() {
			return new $mol_range_lazy( {
				length : 30000 ,
				item : rowId => this.row( rowId )
			} )
		}
		
		@ $mol_mem_key()
		row( rowId : number ) {
			return new $mol_range_lazy( {
				length : 30 ,
				item : colId => colId === 0
					? `Row ${ rowId + 1 }`
					: `Cell ${ colId }×${ rowId + 1 }`
			} ).valueOf()
		}
		
		columnTitle( id : number ) {
			if( id == 0 ) return ``
			return `Col ${ id }`
		}
		
	}
}
