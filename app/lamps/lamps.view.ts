namespace $.$mol {
	
	export class $mol_app_lamps extends $.$mol_app_lamps {
		
		@ $mol_mem()
		lamps_all() {
			return $mol_csv_parse( $mol_file.relative( '/mol/app/lamps/lamps.csv' ).content() )
		}
		
		@ $mol_mem()
		lamps() {
			const filter = this.filter().toLowerCase()
			if( !filter ) return this.lamps_all()
			
			return this.lamps_all().filter( lamp => {
				for( let field in lamp ) {
					if( lamp[ field ].toLowerCase().match( filter ) ) return true
				}
				return false
			} )
		}
		
		@ $mol_mem()
		lamps_dict() {
			const dict = {} as { [ key : string ] : any }
			
			this.lamps_all().forEach( lamp => {
				dict[ lamp[ '№' ] ] = lamp
			} )
			
			return dict
		}
		
		lamp_rows() {
			return this.lamps().map( lamp => this.Lamp_row( lamp[ '№' ] ) )
		}
		
		lamp_title( id : string ) {
			const row = this.lamps_dict()[ id ]
			
			const brand = row[ 'Бренд' ]
			if( brand === 'noname' ) return row[ 'Модель' ]
			
			return `${ row[ 'Бренд' ] } ${ row[ 'Модель' ] }`
		}
		
		filter( next? : string ) {
			return $mol_state_arg.value( 'filter' , next ) || ''
		}
		
		lamp_arg( id : string ) {
			return { 'lamp' : id }
		}
		
		id( next? : string ) {
			return $mol_state_arg.value( 'lamp' , next )
		}
		
		lamp() {
			return this.lamps_dict()[ this.id() ] || null
		}
		
		pages() {
			return [ 
				this.Addon_page(),
				this.lamp() ? this.Main_page() : null
			]
		}
		
		title() {
			const id = this.id()
			if( !id ) return 'LampTest.ru'
			
			return this.lamp_title( id )
		}
		
		cri() {
			return `${ this.lamp()[ 'CRI' ] }%`
		}
		
		angle() {
			return `${ this.lamp()[ 'Угол' ] }°`
		}
		
		shape() {
			return `${ this.lamp()[ 'Вид' ] }`
		}
		
		base() {
			return `${ this.lamp()[ 'Цок.' ] }`
		}
		
		type() {
			return `${ this.lamp()[ 'Тип' ] }`
		}
		
		temp() {
			return `${ this.lamp()[ 'Цвет' ] }`
		}
		
		slug() {
			const trans = {
				'а' : 'a' ,
				'б' : 'b' ,
				'в' : 'v' ,
				'г' : 'g' ,
				'д' : 'd' ,
				'е' : 'e' ,
				'ё' : 'yo' ,
				'ж' : 'zh' ,
				'з' : 'z' ,
				'и' : 'i' ,
				'й' : 'y' ,
				'к' : 'k' ,
				'л' : 'l' ,
				'м' : 'm' ,
				'н' : 'n' ,
				'о' : 'o' ,
				'п' : 'p' ,
				'р' : 'r' ,
				'с' : 's' ,
				'т' : 't' ,
				'у' : 'u' ,
				'ф' : 'f' ,
				'х' : 'h' ,
				'ц' : 'ts' ,
				'ч' : 'ch' ,
				'ш' : 'sh' ,
				'щ' : 'sch' ,
				'ъ' : '\'' ,
				'ы' : 'yi' ,
				'ь' : '' ,
				'э' : 'e' ,
				'ю' : 'yu' ,
				'я' : 'ya' ,
			}
			
			return this.lamp_title( this.id() )
				.replace( /[ \/]/g , '-' )
				.replace( /[.,]/g , '' )
				.toLowerCase()
				.replace( /[а-я]/g , ( letter : string )=> trans[ letter ] )
		}
		
		photo() {
			return `//lamptest.ru/images/photo/${ this.slug() }.jpg`
		}
		
	}
	
}
