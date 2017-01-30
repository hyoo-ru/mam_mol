namespace $.$mol {
	export class $mol_select extends $.$mol_select {
		
		@$mol_mem()
		focused() {
			return $mol_view_selection.focused().indexOf( this.dom_node() ) !== -1
		}
		
		@$mol_mem()
		options_showed( val? : boolean ) {
			if( !this.focused() ) return false
			
			if( val !== void 0 ) return val
			
			if( this.filter_pattern() ) return true
			
			return false
		}
		
		@$mol_mem()
		options() {
			return Object.keys( this.dictionary() )
		}
		
		options_filtered() {
			let filter = this.filter_pattern()
			
			return this.options().filter(
				id => {
					if( id === this.value() ) return false
					
					return this.option_label( id ).toLowerCase().match( filter )
				}
			)
		}
		
		option_label( id : string ) {
			const value = this.dictionary()[ id ]
			return value === void 0 ? id : value
		}
		
		option_rows() {
			if( this.options_filtered().length === 0 ) return [ this.No_options() ]
			
			let options = this.options_filtered().map( ( option : string ) => this.Option_row( option ) )
			
			if(this.clearable() && this.value()) options = [ this.Option_row( '' ) ].concat(options)
						
			return options
		}
		
		option_content_super( id: string ) {
			if( id === '' ) return [ this.Сlear_option_content() ]
			else return this.option_content(id)
		}
		
		@$mol_mem()
		option_focused( component : $mol_view ) {
			if( component === void 0 ) return ""
			if( this.options_showed() ) {
				$mol_view_selection.focused( [ component.dom_node() ] )
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
		
		select_bubble_content() {
			return [ ... this.searchable() ? this.filter_content() : [], this.Options() ]
		}
		
		value_content() {
			return this.value() ? this.option_content( this.value() ) : null
		}
		
	}
}
