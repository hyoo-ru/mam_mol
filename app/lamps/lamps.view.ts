namespace $.$$ {
	
	export class $mol_app_lamps extends $.$mol_app_lamps {
		
		@ $mol_mem
		lamps_all() {
			return $mol_csv_parse( $mol_http.resource( 'http://lamptest.ru/led.php' ).text() )
		}
		
		@ $mol_mem
		lamps() {
			return this.lamps_all().filter( $mol_match_text( this.filter() , ( lamp : any )=> Object.keys( lamp ).map( field => lamp[ field ] ) ) )
		}
		
		@ $mol_mem
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
		
		_filter_timer = 0
		@ $mol_mem
		filter( next? : string , force? : $mol_atom_force ) : string {
			if( next === void null ) return $mol_state_arg.value( 'filter' ) || ''
			
			$mol_state_arg.value( 'filter' , next )
			
			if( this._filter_timer ) clearTimeout( this._filter_timer )
			this._filter_timer = setTimeout( ()=> { this.filter( void null , $mol_atom_force_cache ) } , 500 )
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

		@ $mol_mem
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
		
		ripple() {
			return `${ this.lamp()[ 'flicker' ] }%`
		}
		
		rating_cri() {
			const cri = this.lamp()[ 'cri' ]
			if( cri >= 90 ) return 5
			if( cri >= 85 ) return 4.5
			if( cri >= 80 ) return 4
			if( cri >= 75 ) return 3.5
			if( cri >= 70 ) return 3
			if( cri >= 60 ) return 2
			return 1
		}
		
		rating() {
			return Math.min( this.rating_cri() )
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
			
			const prefix = '0'.repeat(5 - id.length) + id + '-'
			
			return prefix + this.lamp_title( id )
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
