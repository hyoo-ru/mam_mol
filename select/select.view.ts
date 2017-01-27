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
			return this.dictionary()[ id ] || id
		}
		
		@$mol_mem()
		option_focused( key : string ) {
			if( key === void 0 ) return ""
			
			if( this.options_showed() ) {
				$mol_view_selection.focused( [ this.Option_row( key ).dom_node() ] )
			} else {
				this.value( key )
			}
			
			return key
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
		
		controls() {
			const showString = this.searchable() && ( !this.value() || this.options_showed() ) 
			return [
				showString ? this.String() : null ,
				this.Trigger() ,
			]
		}
		
		option_rows() {
			if( this.options_filtered().length === 0 ) return [ this.No_options() ]
			
			return this.options_filtered().map( ( option : string ) => this.Option_row( option ) )
		}
		
		value_content() {
			const showContent = this.value() && ( !this.options_showed() || !this.searchable() )
			return showContent ? this.option_content( this.value() ) : null
		}
		
	}
}
