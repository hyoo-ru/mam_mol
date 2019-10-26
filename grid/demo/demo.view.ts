namespace $.$$ {
	export class $mol_grid_demo extends $.$mol_grid_demo {
		
		@ $mol_mem
		records() {
			return $mol_range2(
				index => $mol_range2(
					colId => colId === 0 ? `Row ${ index + 1 }` : `Row ${ index + 1 } Cell ${ colId }`,
					()=> this.cols() ,
				),
				()=> this.rows() ,
			)
		}
		
		col_head_content( id : string ) {
			if( id == '0' ) return []
			return [ `Col ${ id }` ]
		}
		
	}
}
