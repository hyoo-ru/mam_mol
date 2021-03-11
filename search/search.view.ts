namespace $.$$ {
	
	export class $mol_search extends $.$mol_search {
		
		@ $mol_mem
		suggests_showed( next = true ) {
			
			this.query()
			console.log( $mol_view_selection.focused())
			if( !this.focused() ) return false

			return next
		}

		suggest_selected( next? : string ) {
			if( next === undefined ) return
			
			this.query( next )
			
			$mol_fiber_defer( ()=> {
				this.Query().focused( true )
			} )
			
		}
		
		nav_components() {
			return [
				this.Query(),
				... this.menu_items(),
			]
		}
		
		@ $mol_mem
		nav_focused( component? : $mol_view ) {
			
			if( !this.focused() ) return null
			
			if( component == null ) {
				
				for( let comp of this.nav_components() ) {
					if( comp && comp.focused() ) return comp
				}
				
				return null
			}
			
			if( this.suggests_showed() ) {
				this.ensure_visible( component, "center" )
				component.focused( true )
			}
			
			return component
		}
		
		suggest_label( key: string ) {
			return key
		}
		
		menu_items() {
			return this.suggests().map( ( suggest : string ) => this.Suggest( suggest ) )
		}
		
		suggest_select( id : string , event? : MouseEvent ) {
			this.query( id )
			this.Query().focused( false )
		}
		
		clear( event? : Event ) {
			this.query( '' )
		}
		
	}
	
}
