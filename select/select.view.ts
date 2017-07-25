namespace $.$mol {
	export class $mol_select extends $.$mol_select {
		
		@ $mol_mem()
		filter_pattern( next? : string ) {
			if( !this.focused() ) return ''
			
			return next || ''
		}
		
		@ $mol_mem()
		options_showed( val? : boolean ) {
			if( !this.focused() ) return false
			
			if( val !== undefined ) return val
			
			if( this.filter_pattern() ) return true
			
			return false
		}
		
		@ $mol_mem()
		options() {
			return Object.keys( this.dictionary() )
		}
		
		options_filtered() {
			const filter = this.filter_pattern().toLowerCase()
			const value = this.value()
			
			return this.options().filter(
				id => {
					if( id === value ) return false
					
					return this.option_label( id ).toLowerCase().match( filter )
				}
			)
		}
		
		option_label( id : string ) {
			const value = this.dictionary()[ id ]
			return value == null ? id : value
		}
		
		option_rows() {
			if( this.options_filtered().length === 0 ) return [ this.No_options() ]
			
			let options = this.options_filtered().map( ( option : string ) => this.Option_row( option ) )
			
			if( this.clearable() && this.value() ) options = [ this.Option_row( '' ) ].concat( options )
			
			return options
		}
		
		option_content_super( id: string ) {
			if( id === '' ) return [ this.Сlear_option_content() ]
			else return this.option_content( id )
		}
		
		@ $mol_mem()
		option_focused( component : $mol_view ) {
			if( component === undefined ) {
				for( let comp of this.nav_components() ) {
					if( comp.focused() ) return comp
				}
				
				return this.Filter_string()
			}
			
			if( this.options_showed() ) {
				component.focused( true )
			}
			
			return component
		}
		
		event_showed_toggle( event? : MouseEvent ) {
			this.options_showed( !this.options_showed() )
		}
		
		event_select( id : string , event? : MouseEvent ) {
			this.value( id )
			this.options_showed( false )
		}
		
		searchable() {
			return this.options().length >= this.search_breakpoint()
		}
		
		nav_components() {
			return [ ... this.searchable() ? this.filter_content() : [] ].concat( this.option_rows() )
		}
		
		bubble_content() {
			return [ ... this.searchable() ? this.filter_content() : [] ].concat( this.option_rows() )
		}
		
		value_content() {
			return this.value() ? this.option_content( this.value() ) : null
		}
		
	}
}
