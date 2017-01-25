namespace $.$mol {
	export class $mol_select extends $.$mol_select {
		@$mol_mem()
		focused() {
			return $mol_view_selection.focused().indexOf( this.dom_node() ) !== -1 
		}
		
		@$mol_mem()
		options_showed( val?: boolean ) {
			if ( !this.focused() )
				return false;	
			if (val !== void 0) 
				return val;	
			if (this.pattern())
				return true;	
			return false;
		}
		
		@$mol_mem()
		options() {
			return Object.keys(this.dictionary());
		}
		
		options_filtered () {
			let filter = this.pattern();
			return this.options().filter( 
				id => this.option_label(id).toLowerCase().match( filter ) 
			);
		}
		
		option_label ( id: string ) {
			return this.dictionary()[ id ] || id
		}
		
		@$mol_mem()
		option_focused( key: string ) {
			if(key === void 0) return ""
			if(this.options_showed())
				$mol_view_selection.focused([this.Option_row(key).dom_node()])
			else
				this.value(key)
			return key
		}
		
		event_showed_toggle(event?: MouseEvent) {
			this.options_showed(!this.options_showed());
		}
		
		event_select ( id: string, event?: MouseEvent ) {
			this.value( id )
			this.options_showed(false);
		}
		
		searchable() {
			return this.options().length >= this.search_breakpoint()
		}
		
		controls() {
			return [
				this.searchable() && (!this.value() || this.options_showed())
					? this.String()
					: null ,
				this.Trigger()
			]
		}
		
		option_rows () {
			if(this.options_filtered().length === 0)
				return [ this.No_options() ]
			else
				return this.options_filtered().map( ( option: string ) => this.Option_row( option ) )
		}
		
		value_content () {
			if (this.searchable())
				return (this.value() && !this.options_showed())
					? this.option_content(this.value())
					: null
			else		
				return this.value()
					? this.option_content(this.value())
					: null
		}	
	}
}
