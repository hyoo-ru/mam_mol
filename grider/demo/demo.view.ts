module $.$mol {
	export class $mol_grider_demo extends $.$mol_grider_demo {
		
		@ $mol_mem()
		rowers() {
			return new $mol_range_lazy( {
				length : 30000 ,
				item : row => this.rower([ row ])
			} )
		}
		
		@ $mol_mem_key()
		rowCells( row : number ) {
			return new $mol_range_lazy( {
				length : 30 ,
				item : col => this.celler([ row , col ])
			} ).valueOf()
		}
		
		cellContent( id : [ number[] , number ] ) {
			if( id[1] === 0 ) return id[0].join( '.' )
			return `${ id[1] }`
		}
		
	}
}
