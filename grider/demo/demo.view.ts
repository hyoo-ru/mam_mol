namespace $.$mol {
	export class $mol_grider_demo extends $.$mol_grider_demo {
		
		@ $mol_mem()
		rowers() {
			return new $mol_range_lazy( {
				length : 30000 ,
				item : row => this.rower( row )
			} )
		}
		
		@ $mol_mem_key()
		cellers( row : number ) {
			return new $mol_range_lazy( {
				length : 30 ,
				item : col => this.celler({ row , col })
			} ).valueOf()
		}
		
		cellTitle( id : { row : number , col : number } ) {
			if( id.col === 0 ) return ``
			return `Col ${ id.col }`
		}
		
		cellContent( id : { row : number , col : number } ) {
			if( id.col === 0 ) return `Row ${ id.row + 1 }`
			return `Cell ${ id.col }×${ id.row + 1 }`
		}
		
	}
}
