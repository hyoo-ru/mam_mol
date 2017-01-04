namespace $.$mol {
	
	export class $mol_bencher extends $.$mol_bencher {
		
		@ $mol_mem()
		colSort( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'sort' ) , next )
		}
		
		@ $mol_mem()
		resultsSorted() {
			const prev = this.results()
			const col = this.colSort()
			if( !col ) return prev
			
			const next : { [ sample : string ] : { [ step : string ] : any } } = {}
			
			const keys = Object.keys( prev )
			keys.sort( ( a , b )=> this.resultNumber({ row : [ '' , a ] , col }) - this.resultNumber({ row : [ '' , b ] , col }) )
			keys.forEach( row => next[ row ] = prev[ row ] )
			
			return next
		}
		
		resultValue( id : { row : string[] , col : string } ) {
			return this.results()[ id.row[ id.row.length - 1 ] ][ id.col ]
		}
		
		resultNumber( id : { row : string[] , col : string } ) {
			return parseInt( this.resultValue( id ) , 10 )
		}
		
		@ $mol_mem_key()
		resultMaxValue( col : string ) {
			let max = 0
			
			const rows = this.rows()
			rows.forEach( row => {
				const numb = this.resultNumber({ row , col })
				if( numb > max ) max = numb
			} )
			
			return max
		}
		
		resultPortion( id : { row : string[] , col : string } ) {
			return this.resultNumber( id ) / this.resultMaxValue( id.col )
		}
		
		columnHeaderLabel( col : string ) {
			return [ col ]
		}
		
		eventSortToggle( col : string , next? : Event ) {
			this.colSort( col )
		}
		
		@ $mol_mem_key()
		colType( col : string ) {
			if( col === this.hierarchyColumn() ) return 'branch'
			
			const rowFirst = this.row(0)
			const val = this.record( rowFirst[ rowFirst.length - 1 ] )[ col ]
			if( !isNaN( parseFloat( val ) ) ) return 'number'
			
			return 'text'
		}
		
		cellerContentNumber( id : { row : string[] , col : string } ) {
			return [
				this.resultValue( id ) ,
				( this.colSort() === id.col )
					? this.resultPortioner( id )
					: null
			]
		}
		
		columnHeaderContent( col : string ) {
			return [].concat(
				this.columnHeaderLabel( col ) ,
				( this.colSort() === col )
					? this.columnHeaderSorter( col )
					: null
			)
		}
		
	}
	
}
