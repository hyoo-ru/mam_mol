module $.$mol {
	
	export interface $mol_app_report_formatCol {
		title : string
		field? : string
		childs? : $mol_app_report_formatCol[]
	}
	
	export interface $mol_app_report_formatRow {
		title : string
		field? : string
		childs? : $mol_app_report_formatRow[]
	}
	
	export interface $mol_app_report_scheme {
		type : string
		unit? : string
		options? : { [ name : string ] : string }
	}
	
	export class $mol_app_report extends $.$mol_app_report {
		
		formatCols() : $mol_app_report_formatCol[] {
			return [
				{
					title : '№ п/п' ,
				} ,
				{
					title : 'Наименование' ,
				} ,
				{
					title : 'Форма записи' ,
				} ,
				{
					title : 'Значение' ,
				} ,
			]
		}
		
		formatRows() : $mol_app_report_formatRow[] {
			return [
				{
					title : 'Фундамент' ,
					childs : [
						{
							title : 'Габаритный размер' ,
							childs : [
								{
									field : 'fundament_length' ,
									title : 'Длинна' ,
								} ,
								{
									field : 'fundament_width' ,
									title : 'Ширина' ,
								} ,
								{
									field : 'fundament_height' , 
									title : 'Высота' ,
								} ,
							]
						} ,
						{
							field : 'fundament_kind' ,
							title : 'Вид' ,
						} ,
						{
							field : 'fundament_type' ,
							title : 'Тип' ,
						} ,
					]
				}
			]
		}
		
		scheme() : { [ field : string ] : $mol_app_report_scheme } {
			return {
				'fundament_length' : {
					type : 'number' ,
					unit : 'мм' ,
				} ,
				'fundament_width' : {
					type : 'number' ,
					unit : 'мм' ,
				} ,
				'fundament_height' : {
					type : 'number' ,
					unit : 'мм' ,
				} ,
				'fundament_kind' : {
					type : 'enum' ,
					options : {
						union : 'Единый' ,
						separated : 'Раздельный насос и электродвигатель' ,
					} ,
				} ,
				'fundament_type' : {
					type : 'enum' ,
					options : {
						ribbon : 'Ленточный' ,
						ring : 'Кольцевой' ,
						pile : 'Свайный' ,
					} ,
				} ,
			}
		}
		
		data() : { [ field : string ] : string } {
			return {
				fundament_length : '403300' ,
				fundament_width : '22000' ,
				fundament_height : '25000' ,
				fundament_kind : 'union' ,
				fundament_type : 'ribbon' ,
			}
		}
		
		description() {
			return `Приложение №1\nПасспор-формуляр\nМагистральный насосный агрегат\nMHA-1`
		}
		
		headCells() {
			return [
				this.celler( [ 0 , 0 ] ) ,
				this.celler( [ 0 , 1 ] ) ,
				this.celler( [ 0 , 2 ] ) ,
				this.celler( [ 0 , 3 ] ) ,
			]
		}
		
		rows() {
			const rows : $mol_app_report_rower[] = []
			
			const visit = ( pos : number[] , format : $mol_app_report_formatRow )=> {
				rows.push( this.rower( pos ) )
				if( format.childs ) format.childs.forEach( ( format , index )=> {
					visit( pos.concat( index + 1 ) , format )
				} )
			}
			
			this.formatRows().forEach( ( format , index ) => {
				visit( [ index + 1 ] , format )
			} )
			
			return rows
		}
		
		formatRow( pos : number[] ) {
			let formatRows = this.formatRows()
			let next : $mol_app_report_formatRow = null
			for( let index of pos ) {
				next = formatRows[ index - 1 ]
				formatRows = next.childs
			}
			return next
		}
		
		rowerCells( pos : number[] ) {
			const formatRow = this.formatRow( pos )
			return [
				this.celler( pos.concat( 0 ) ) ,
				this.celler( pos.concat( 1 ) ) ,
				formatRow.field ? this.celler( pos.concat( 2 ) ) : null ,
				formatRow.field ? this.celler( pos.concat( 3 ) ) : null ,
			]
		}
		
		cellCols( pos : number[] ) {
			if( pos[0] === 0 ) {
				return 1
			}
			
			const col = pos[ pos.length - 1 ]
			if( col === 0 ) return 1
			
			const formatRow = this.formatRow( pos.slice( 0 , pos.length - 1 ) )
			if( !formatRow.field ) {
				if( col === 1 ) return 3
				else return 0
			}
			
			return 1
		}
		
		@ $mol_prop()
		cellContent( pos : number[] ) {
			if( pos[0] === 0 ) {
				return this.texter( pos )
			}
			
			const col = pos[ pos.length - 1 ]
			
			if( col === 3 ) {
				const field = this.formatRow( pos.slice( 0 , pos.length - 1 ) ).field
				const scheme = this.scheme()[ field ]
				
				switch( scheme.type ) {
					case 'number' : return this.number( pos )
					case 'enum' : return this.stringer( pos )
				}
			} else {
				return this.texter( pos )
			}
		}
		
		@ $mol_prop()
		cellValue( pos : number[] , ...diff : any[] ) {
			if( diff[0] !== void 0 ) return diff[0]
			
			if( pos[0] === 0 ) {
				return this.formatCols()[ pos[1] ].title
			}
			
			const col = pos[ pos.length - 1 ]
			switch( col ) {
				case 0 : return pos.slice( 0 , pos.length - 1 ).join( '.' )
				case 1 : return this.cellContentName( pos.slice( 0 , pos.length - 1 ) )
				case 2 : return this.cellContentType( pos.slice( 0 , pos.length - 1 )  )
				case 3 : return this.cellContentValue( pos.slice( 0 , pos.length - 1 )  )
			}
			
			return ''
		}
		
		cellContentName( pos : number[] ) {
			const formatRow = this.formatRow( pos )
			return formatRow.title
		}
		
		cellContentType( pos : number[] ) {
			const field = this.formatRow( pos ).field
			if( !field ) return ''
			
			const scheme = this.scheme()[ field ]
			
			switch( scheme.type ) {
				case 'number' : return 'XX'
				case 'enum' : return Object.keys( scheme.options ).map( key => scheme.options[ key ] ).join( ' / ' )
			}
			
			return ''
		}
		
		cellContentValue( pos : number[] ) {
			const field = this.formatRow( pos ).field
			if( !field ) return ''
			
			const scheme = this.scheme()[ field ]
			
			switch( scheme.type ) {
				case 'number' : return `${ this.data()[ field ] }`
				case 'enum' : return scheme.options[ this.data()[ field ] ]
			}
			
			return '' 
		}
		
	}
}
