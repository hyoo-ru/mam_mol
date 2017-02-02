namespace $.$mol {
	
	export class $mol_app_lamps extends $.$mol_app_lamps {
		
		@ $mol_mem()
		lamps_all() {
			return $mol_csv_parse( $mol_http_resource.item( 'lamps.csv' ).text() )
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
			return `${ row[ 'Бренд' ] } ${ row[ 'Модель' ] }`
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
		
		main() {
			return this.lamp() ? super.main() : []
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
		
	}
	
}
