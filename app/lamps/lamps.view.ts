namespace $.$mol {
	
	export class $mol_app_lamps extends $.$mol_app_lamps {
		
		@ $mol_mem()
		lamps_all() {
			return $mol_csv_parse( $mol_http.resource( 'http://lamptest.ru/led.php' ).text() )
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
				dict[ lamp[ 'no' ] ] = lamp
			} )
			
			return dict
		}
		
		lamp_rows() {
			return this.lamps().map( lamp => this.Lamp_row( lamp[ 'no' ] ) )
		}
		
		lamp_title( id : string ) {
			const row = this.lamps_dict()[ id ]
			
			const brand = row[ 'brand' ]
			if( brand === 'noname' ) return row[ 'model' ]
			
			return `${ row[ 'brand' ] } ${ row[ 'model' ] }`
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
			let sub : $mol_view[] = []
			
			sub.push( this.Addon_page() )
			
			if( this.lamp() ) sub.push( this.Main_page() )
			
			return sub
		}
		
		Placeholder() {
			return this.lamp() ? null : super.Placeholder()
		}

		@ $mol_mem()
		menu_scroll_top( next? : number ) {
			this.filter()
			return next || 0
		}
		
		title() {
			const id = this.id()
			if( !id ) return 'LampTest.ru'
			
			return this.lamp_title( id )
		}
		
		cri() {
			return `${ this.lamp()[ 'cri' ] }%`
		}
		
		angle() {
			return `${ this.lamp()[ 'angle' ] }°`
		}
		
		shape() {
			return `${ this.lamp()[ 'shape' ] }`
		}
		
		base() {
			return `${ this.lamp()[ 'base' ] }`
		}
		
		type() {
			return `${ this.lamp()[ 'type' ] }`
		}
		
		temp() {
			return `${ this.lamp()[ 'color_l' ] }`
		}
		
		matt() {
			return this.lamp()[ 'matt' ] == 1
		}
		
		slug( id : string ) {
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
			
			return this.lamp_title( id )
				.replace( /[ \/]/g , '-' )
				.replace( /[.,]/g , '' )
				.toLowerCase()
				.replace( /[а-я]/g , ( letter : string )=> trans[ letter ] )
		}
		
		photo() {
			return `http://lamptest.ru/images/photo/${ this.slug( this.id() ) }.jpg`
		}
		
		thumb( id : string ) {
			return `http://lamptest.ru/images/photo/${ this.slug( id ) }-med.jpg`
		}
		
	}
	
}
