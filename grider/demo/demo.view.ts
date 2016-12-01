namespace $.$mol {
	export class $mol_grider_demo extends $.$mol_grider_demo {
		
		@ $mol_mem()
		records() {
			return new $mol_range_lazy( {
				length : 10000 ,
				item : index => {
					return new $mol_range_lazy( {
						length : 15 ,
						item : colId => colId === 0
							? `Row ${ index + 1 }`
							: `Cell ${ colId }×${ index + 1 }`
					} ).valueOf()
				}
			} ).valueOf()
		}
		
		columnHeaderContent( id : string ) {
			if( id == '0' ) return []
			return [ `Col ${ id }` ]
		}
		
	}
}
