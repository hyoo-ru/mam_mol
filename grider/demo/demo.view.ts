namespace $.$mol {
	export class $mol_grider_demo extends $.$mol_grider_demo {
		
		@ $mol_mem()
		records() {
			return $mol_range_in( {
				length : 1000 ,
				item : index => {
					return $mol_range_in( {
						length : 15 ,
						item : colId => colId === 0
							? `Row ${ index + 1 }`
							: `Cell ${ colId }×${ index + 1 }`
					} ).valueOf() as string[]
				}
			} ).valueOf() as string[][]
		}
		
		columnHeaderContent( id : string ) {
			if( id == '0' ) return []
			return [ `Col ${ id }` ]
		}
		
	}
}
