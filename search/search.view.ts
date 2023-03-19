namespace $.$$ {
	
	/**
	 * Search input with suggest and clear button.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
	 */
	export class $mol_search extends $.$mol_search {
		
		@ $mol_mem
		anchor_content() {
			return [
				this.Query(),
				... this.query() ? [ this.Clear() ] : [],
			]
		}
		
		@ $mol_mem
		suggests_showed( next = true ) {
			
			this.query()
			
			if( !this.focused() ) return false

			return next
		}

		suggest_selected( next? : string ) {
			
			if( next === undefined ) return
			
			this.query( next )
			this.Query().focused( true )
			
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
		
		@ $mol_mem
		menu_items() {
			return this.suggests().map( ( suggest : string ) => this.Suggest( suggest ) )
		}
		
		suggest_select( id : string , event? : MouseEvent ) {
			this.query( id )
			this.Query().selection([ id.length, id.length ])
			this.Query().focused( true )
		}
		
		clear( event? : Event ) {
			this.query( '' )
		}
		
	}
	
}
