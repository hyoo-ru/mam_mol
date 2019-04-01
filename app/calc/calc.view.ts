namespace $.$$ {

	export class $mol_app_calc extends $.$mol_app_calc {

		@ $mol_mem
		formulas( next? : { [ key : string ] : string } ) {
			const formulas : typeof next = {}
			
			let args = this.$.$mol_state_arg.dict()
			if( next ) args = this.$.$mol_state_arg.dict({ ... args , ... next })

			const ids = Object.keys( args ).filter( param => this.id2coord( param ) )
			
			for( let id of ids ) formulas[ id ] = args[ id ]

			return formulas
		}

		@ $mol_mem
		formula_name( id : string ) {
			
			const found = /^(\w*)\s*=/u.exec( this.formulas()[ id ] )
			if( !found ) return null

			return found[1]
		}

		@ $mol_mem
		refs() {
			
			const formulas = this.formulas()
			const vars = {} as Record< string , string >
			
			for( const id in formulas ) {
				
				const name = this.formula_name( id )
				if( !name ) continue

				if( vars[ name ] ) throw new Error( `Names conflict: ${ id }, ${ vars[ name ] }` )
				
				vars[ name ] = id
			}

			return vars
		}

		id2coord( id : string ) : [ number , number ] {
			
			const parsed = /^([A-Z]+)(\d+)$/.exec( id )
			if( !parsed ) return null

			return [ this.string2number( parsed[1] ) , Number( parsed[2] ) ]
		}

		coord2id( coord : [ number , number ] ) : string {
			return `${ this.number2string( coord[0] ) }${ coord[1] }`
		}

		@ $mol_mem
		dimensions() {

			const dims = {
				rows : 3 ,
				cols : 3 ,
			}

			for( let key of Object.keys( this.formulas() ) ) {
				const coord = this.id2coord( key )

				const rows = coord[1] + 3
				const cols = coord[0] + 3
				
				if( rows > dims.rows ) dims.rows = rows
				if( cols > dims.cols ) dims.cols = cols
			}
			
			return dims
		}

		@ $mol_mem
		col_ids() {
			return Array( this.dimensions().cols ).join(' ').split(' ').map( ( _ , i )=> i + 1 )
		}

		@ $mol_mem
		row_ids() {
			return Array( this.dimensions().rows ).join(' ').split(' ').map( ( _ , i )=> i + 1 )
		}

		number2string( numb : number ) {
			
			if( numb <= 0 ) return ''
			numb --
			
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
			return numb + 1
		}

		title( next? : string ) {
			const title = this.$.$mol_state_arg.value( `title` , next )
			return title == undefined ? super.title() : title
		}

		col_title( id : number ) {
			return this.number2string( id )
		}

		row_title( id : number ) {
			return String( id )
		}

		@ $mol_mem
		head_cells() {
			return [ this.Col_head( 0 ) , ... this.col_ids().map( colId => this.Col_head( colId ) ) ]
		}
		
		cells( row_id : number ) {
			return [ this.Row_head( row_id ) , ... this.col_ids().map( col_id => this.Cell( this.coord2id([ col_id , row_id ]) ) ) ]
		}

		@ $mol_mem_key
		selected( id : string , next? : boolean ) {
			return this.Cell( this.pos( next ? id : undefined ) ) === this.Cell( id )
		}

		@ $mol_mem
		pos( next? : string ) : string {
			new $mol_defer( ()=> this.Edit_current().Edit().focused( true ) )
			return next || super.pos()
		}

		@ $mol_mem
		coord( next? : [ number , number ] ) {
			return this.id2coord( this.pos( next && this.coord2id( next ) ) )
		}

		Edit_current() {
			return this.Edit( this.pos() )
		}

		current_row( next? : number ) {
			return this.coord( next === undefined ? undefined : [ this.coord()[0] , next ] )[ 1 ]
		}

		current_col( next? : number ) {
			return this.coord( next === undefined ? undefined : [ next , this.coord()[1] ] )[ 0 ]
		}

		@ $mol_mem_key
		formula( id : string , next? : string ) {
			return this.formulas( next === undefined ? undefined : { [ id ] : next || null } )[ id ] || ''
		}

		formula_current( next? : string ) {
			return this.formula( this.pos() , next )
		}

		@ $mol_mem
		sandbox() {
			return new $mol_func_sandbox( Math , {
				'$' : new Proxy( {} , { get : ( _ , id : string ) : any => {
					return this.result( id )
				} } ) ,
				'$$' : new Proxy( {} , { get : ( _ , id : string ) : any => {
					return this.formula( id )
				} } ) ,
				'_' : new Proxy( {} , { get : ( _ , name : string ) : any => {
					return this.result( this.refs()[ name ] )
				} } ) ,
				'__' : new Proxy( {} , { get : ( _ , name : string ) : any => {
					return this.refs()[ name ]
				} } ) ,
			} )
		}

		sub() {
			return [
				this.Head() ,
				this.Body() ,
				... this.hint_showed() ? [ this.Hint() ] : [] ,
				this.Current() ,
			]
		}

		@ $mol_mem
		hint() {
			const context = this.sandbox().context()
			const keys = Object.keys( context ).filter( key => context[ key ] !== undefined )
			const funcs = keys.filter( key => typeof context[ key ] === 'function' )
			return super.hint().replace( '{funcs}' , funcs.join( ', ' ) )
		}

		@ $mol_mem
		cell_content( id : string ) {
			
			const name = this.formula_name( id )
			
			let val = this.result( id )
			if( typeof val === 'object' ) val = JSON.stringify( val )

			return name ? `${name} = ${val}` : val
		}

		@ $mol_mem_key
		func( id : string ) {
			const formula = this.formula( id )
			if( !/^(\w*)?\s*=/u.test( formula ) ) return ()=> formula
			
			const code = 'return ' + formula
			.replace( /@([A-Z]+[0-9]+)\b/g , '$$.$1' )
			.replace( /([^.])([A-Z]+[0-9]+)\b/g , '$1$.$2' )
			.replace( /^(\w*)?\s*=/u , '' )
			
			return this.sandbox().eval( code )
		}

		@ $mol_mem_key
		result( id : string ) {
			const res = this.func( id )()
			if( res === undefined ) return ''
			if( res === '' ) return ''
			if( isNaN( res ) ) return res
			return Number( res )
		}

		paste( event? : ClipboardEvent ) {
			const table = event.clipboardData.getData( 'text/plain' ).trim().split( '\n' ).map( row => row.split( '\t' ) ) as string[][]
			if( table.length === 1 && table[0].length === 1 ) return

			const [ col_start , row_start ] = this.id2coord( this.pos() )
			const patch = {}

			for( let row in table ) {
				for( let col in table[ row ] ) {
					const id = this.coord2id([ col_start + Number( col ) , row_start + Number( row ) ])
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
					row_data[ col ] = String( this.result( this.coord2id([ col , row ]) ) )
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
