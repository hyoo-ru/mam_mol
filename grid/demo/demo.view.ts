namespace $.$$ {
	export class $mol_grid_demo extends $.$mol_grid_demo {
		
		@ $mol_mem
		records() {
			return $mol_range_in( {
				length : 1000 ,
				item : index => {
					return $mol_range_in( {
						length : 10 ,
						item : colId => colId === 0
							? `Row ${ index + 1 }`
							: `Row ${ index + 1 } Cell ${ colId }`
					} ).valueOf() as string[]
				}
			} ).valueOf() as string[][]
		}
		
		col_head_content( id : string ) {
			if( id == '0' ) return []
			return [ `Col ${ id }` ]
		}
		
	}
}
