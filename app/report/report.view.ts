namespace $.$$ {
	
	export interface $mol_app_report_formatCol {
		title : string
		field? : string
		sub? : $mol_app_report_formatCol[]
	}
	
	export interface $mol_app_report_formatRow {
		title : string
		field? : string
		sub? : $mol_app_report_formatRow[]
	}
	
	export interface $mol_app_report_scheme {
		type : string
		mask? : string
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
					title : 'Значение' ,
				} ,
			]
		}
		
		format_rows() : $mol_app_report_formatRow[] {
			return [
				{
					title : 'Фундамент' ,
					sub : [
						{
							title : 'Габаритный размер' ,
							sub : [
								{
									field : 'base_length' ,
									title : 'Длинна' ,
								} ,
								{
									field : 'base_width' ,
									title : 'Ширина' ,
								} ,
								{
									field : 'base_height' , 
									title : 'Высота' ,
								} ,
							]
						} ,
						{
							field : 'base_kind' ,
							title : 'Вид' ,
						} ,
						{
							field : 'base_type' ,
							title : 'Тип' ,
						} ,
						{
							field : 'base_release_year' ,
							title : 'Год ввода в эксплуатацию' ,
						} ,
						{
							field : 'base_weight_max' ,
							title : 'Несущая способность' ,
						} ,
					]
				} ,
				{
					title : 'Кровля' ,
					sub : [
						{
							title : 'Габаритный размер' ,
							sub : [
								{
									field : 'roof_length' ,
									title : 'Длинна' ,
								} ,
								{
									field : 'roof_width' ,
									title : 'Ширина' ,
								} ,
								{
									field : 'roof_height' ,
									title : 'Высота' ,
								} ,
							]
						} ,
					]
				} ,
			]
		}
		
		scheme() : { [ field : string ] : $mol_app_report_scheme } {
			return {
				'base_length' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
				'base_width' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
				'base_height' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
				'base_kind' : {
					type : 'enum' ,
					options : {
						union : 'Единый' ,
						separated : 'Раздельный насос и электродвигатель' ,
					} ,
				} ,
				'base_type' : {
					type : 'enum' ,
					options : {
						ribbon : 'Ленточный' ,
						ring : 'Кольцевой' ,
						pile : 'Свайный' ,
					} ,
				} ,
				'base_release_year' : {
					type : 'number' ,
					mask : 'гггг' ,
					unit : 'г.'
				} ,
				'base_weight_max' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'кг' ,
				} ,
				'roof_length' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
				'roof_width' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
				'roof_height' : {
					type : 'number' ,
					mask : 'XX' ,
					unit : 'мм' ,
				} ,
			}
		}
		
		data() : { [ field : string ] : string } {
			return {
				base_length : '403300' ,
				base_width : '22000' ,
				base_height : '25000' ,
				base_kind : 'union' ,
				base_type : 'ribbon' ,
				base_release_year : '1993' ,
				base_weight_max : '30000' ,
				roof_length : '413300' ,
				roof_width : '23000' ,
				roof_height : '26000' ,
			}
		}
		
		description() {
			return `Приложение №1\nПасспор-формуляр\nМагистральный насосный агрегат\nMHA-1`
		}
		
		headCells() {
			return [
				this.cell( [ 0 , 0 ] ) ,
				this.cell( [ 0 , 1 ] ) ,
				this.cell( [ 0 , 2 ] ) ,
			]
		}
		
		rows() {
			const rows : $mol_app_report_rower[] = []
			
			const visit = ( pos : number[] , format : $mol_app_report_formatRow )=> {
				rows.push( this.rower( pos ) )
				if( format.sub ) format.sub.forEach( ( format , index )=> {
					visit( pos.concat( index + 1 ) , format )
				} )
			}
			
			this.format_rows().forEach( ( format , index ) => {
				visit( [ index + 1 ] , format )
			} )
			
			return rows
		}
		
		formatRow( pos : number[] ) {
			let format_rows = this.format_rows()
			let next : $mol_app_report_formatRow = null
			for( let index of pos ) {
				next = format_rows[ index - 1 ]
				format_rows = next.sub
			}
			return next
		}
		
		rowerCells( pos : number[] ) {
			const formatRow = this.formatRow( pos )
			return [
				this.cell( pos.concat( 0 ) ) ,
				this.cell( pos.concat( 1 ) ) ,
				... formatRow.field ? [ this.cell( pos.concat( 2 ) ) ] : [] ,
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
				if( col === 1 ) return 2
				else return 0
			}
			
			return 1
		}
		
		@ $mol_mem_key
		cell_content( pos : number[] ) : $mol_view {
			if( pos[0] === 0 ) {
				return this.texter( pos )
			}
			
			const col = pos[ pos.length - 1 ]
			
			if( col === 2 ) {
				const field = this.formatRow( pos.slice( 0 , pos.length - 1 ) ).field
				const scheme = this.scheme()[ field ]
				
				switch( scheme.type ) {
					case 'number' : return this.number( pos )
					case 'enum' : return this.select( pos )
				}
			} else {
				return this.texter( pos )
			}
		}
		
		@ $mol_mem_key
		cell_options( pos : number[] ) {
			const field = this.formatRow( pos.slice( 0 , pos.length - 1 ) ).field
			return this.scheme()[ field ].options
		}
		
		@ $mol_mem_key
		cell_value( pos : number[] , next : any ) {
			if( next !== void 0 ) return next
			
			if( pos[0] === 0 ) {
				return this.formatCols()[ pos[1] ].title
			}
			
			const col = pos[ pos.length - 1 ]
			switch( col ) {
				case 0 : return pos.slice( 0 , pos.length - 1 ).join( '.' )
				case 1 : return this.cell_contentName( pos.slice( 0 , pos.length - 1 ) )
				case 2 : return this.cell_contentValue( pos.slice( 0 , pos.length - 1 )  )
			}
			
			return ''
		}
		
		cell_contentName( pos : number[] ) {
			const formatRow = this.formatRow( pos )
			return formatRow.title
		}
		
		cell_contentValue( pos : number[] ) {
			const field = this.formatRow( pos ).field
			if( !field ) return ''
			
			const scheme = this.scheme()[ field ]
			
			switch( scheme.type ) {
				case 'number' : return this.data()[ field ]
				case 'enum' : return scheme.options[ this.data()[ field ] ]
			}
			
			return '' 
		}
		
	}
}
