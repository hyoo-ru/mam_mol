namespace $.$$ {

	export class $mol_app_calc extends $.$mol_app_calc {

		@ $mol_mem
		formulas( next? : { [ key : string ] : string } ) {
			const formulas : typeof next = {}
			
			let args = this.$.$mol_state_arg.dict()
			if( next ) args = this.$.$mol_state_arg.dict({ ... args , ... next })

			const ids = Object.keys( args ).filter( param => /^[A-Z]+\d+$/.test( param ) )
			
			for( let id of ids ) formulas[ id ] = args[ id ]

			return formulas
		}

		@ $mol_mem
		dimensions() {

			const dims = {
				rows : 2 ,
				cols : 3 ,
			}

			for( let key of Object.keys( this.formulas() ) ) {
				const parsed = /^([A-Z]+)(\d+)$/.exec( key )

				const rows = Number( parsed[2] ) + 2
				const cols = this.string2number( parsed[1] ) + 3
				
				if( rows > dims.rows ) dims.rows = rows
				if( cols > dims.cols ) dims.cols = cols
			}
			
			return dims
		}

		@ $mol_mem
		col_ids() {
			return Array( this.dimensions().cols ).join(' ').split(' ').map( ( _ , i )=> this.number2string( i ) )
		}

		@ $mol_mem
		row_ids() {
			return Array( this.dimensions().rows ).join(' ').split(' ').map( ( _ , i )=> i + 1 )
		}

		number2string( numb : number ) {
			const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			let str = ''
			do {
				str = letters[ numb % 26 ] + str
				numb = Math.floor( numb / 26 )
			} while ( numb )
			return str
		}

		string2number( str : string ) {
			let numb = 0
			for( let symb of str.split( '' ) ) {
				numb = numb * 26
				numb += symb.charCodeAt( 0 ) - 65
			}
			return numb
		}

		title( next? : string ) {
			const title = this.$.$mol_state_arg.value( `title` , next )
			return title == undefined ? super.title() : title
		}

		col_title( id : string ) {
			return id
		}

		row_title( id : number ) {
			return String( id )
		}

		@ $mol_mem
		head_cells() {
			return [ this.Col_head( '' ) , ... this.col_ids().map( colId => this.Col_head( colId ) ) ]
		}
		
		cells( row_id : number ) {
			return [ this.Row_head( row_id ) , ... this.col_ids().map( col_id => this.Cell({ row : row_id , col : col_id }) ) ]
		}

		@ $mol_mem_key
		selected( id : { row : number , col : string } , next? : boolean ) {
			return this.Cell( this.current( next ? id : undefined ) ) === this.Cell( id )
		}

		@ $mol_mem
		current( next? : { row : number , col : string } ) {
			new $mol_defer( ()=> this.Edit_current().focused( true ) )
			return next || super.current()
		}

		Edit_current() {
			return this.Edit( this.current() )
		}

		current_row( next? : number ) {
			return this.current( next === undefined ? undefined : { ... this.current() , row : next } ).row
		}

		current_col( next? : number ) {
			return this.current( next === undefined ? undefined : { ... this.current() , col : next } ).col
		}

		pos() {
			const id = this.current()
			return `${ id.col }${ id.row }`
		}

		@ $mol_mem_key
		formula( id : { row : number , col : string } , next? : string ) {
			const pos = `${ id.col }${ id.row }`
			return this.formulas( next === undefined ? undefined : { [ pos ] : next || null } )[ pos ] || ''
		}

		formula_current( next? : string ) {
			return this.formula( this.current() , next )
		}

		@ $mol_mem
		sandbox() {
			return new $mol_func_sandbox( Math , {
				'formula' : this.formula.bind( this ) ,
				'result' : this.result.bind( this ) ,
			} )
		}

		@ $mol_mem_key
		func( id : { row : number , col : string } ) {
			const formula = this.formula( id )
			if( formula[0] !== '=' ) return ()=> formula
			
			const code = 'return ' + formula.slice( 1 )
			.replace( /@([A-Z]+)([0-9]+)\b/g , 'formula({ row : $2 , col : "$1" })' )
			.replace( /\b([A-Z]+)([0-9]+)\b/g , 'result({ row : $2 , col : "$1" })' )
			
			return this.sandbox().eval( code )
		}

		@ $mol_mem_key
		result( id : { row : number , col : string } ) {
			const res = this.func( id )()
			if( res === undefined ) return ''
			if( res === '' ) return ''
			if( isNaN( res ) ) return res
			return Number( res )
		}

		paste( event? : ClipboardEvent ) {
			const table = event.clipboardData.getData( 'text/plain' ).trim().split( '\n' ).map( row => row.split( '\t' ) ) as string[][]
			if( table.length === 1 && table[0].length === 1 ) return

			const anchor = this.current()
			const row_start = anchor.row
			const col_start = this.string2number( anchor.col )
			const patch = {}

			for( let row in table ) {
				for( let col in table[ row ] ) {
					const id = `${ this.number2string( col_start + Number( col ) ) }${ row_start + Number( row ) }`
					patch[ id ] = table[ row ][ col ]
				}
			}

			this.formulas( patch )

			event.preventDefault()
		}

		download_file() {
			return `${ this.title() }.csv`
		}

		download_generate( event? : Event ) {
			const table : string[][] = []
			const dims = this.dimensions()

			for( let row = 1 ; row < dims.rows ; ++ row ) {
				const row_data = [] as any[]
				table.push( row_data )
				
				for( let col = 0 ; col < dims.cols ; ++ col ) {
					row_data[ col ] = String( this.result({ row , col : this.number2string( col ) }) )
				}
			}

			const content = table.map( row => row.map( val => `"${ val.replace( /"/g , '""' ) }"` ).join( ';' ) ).join( '\n' )

			this.download_uri( `data:text/csv;charset=utf-8,${ encodeURIComponent( content ) }` )
			
			$mol_defer.run()
		}

	}

	export class $mol_app_calc_cell extends $.$mol_app_calc_cell {

		click( event? : Event ) {
			if( event ) this.selected( true )
		}

		type() {
			const value = this.value()
			return isNaN( Number( value ) ) ? 'string' : 'number'
		}

	}

}
