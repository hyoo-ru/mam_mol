namespace $.$mol {
	
	export class $mol_search extends $.$mol_search {
		
		suggests_showed() {
			if( !this.focused() ) return false

			return this.suggests().length > 1
		}

		suggest_selected( next? : string ) {
			if( next ) this.Suggest().Filter_string().focused( true )
			return this.query( next )
		}
		
		sub() {
			return [
				this.Suggest() ,
				( this.query().length > 0 ) ? this.Clear() : null ,
			]
		}
		
		event_clear( event? : Event ) {
			this.query( '' )
		}
		
	}
	
}
