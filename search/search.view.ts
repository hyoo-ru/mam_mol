namespace $.$$ {
	
	export class $mol_search extends $.$mol_search {
		
		suggests_showed() {
			if( !this.focused() ) return false

			return this.suggests().length > 1
		}

		suggest_selected( next? : string ) {
			if( next === undefined ) return
			
			this.query( next )
			
			$mol_fiber_defer( ()=>
				this.Suggest_filter().focused( true )
			)
			
		}
		
		sub() {
			return [
				this.Suggest() ,
				... ( this.query().length > 0 ) ? [ this.Clear() ] : [] ,
			]
		}
		
		event_clear( event? : Event ) {
			this.query( '' )
		}
		
	}
	
}
