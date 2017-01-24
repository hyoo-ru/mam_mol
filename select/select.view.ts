namespace $.$mol {
	export class $mol_select extends $.$mol_select {
		@$mol_mem()
		focused() {
			return $mol_view_selection.focused().indexOf( this.dom_node() ) !== -1 
		}
		@$mol_mem()
		expanded( val?: boolean ) {
			if ( !this.focused() )
				return false;	
			if (val !== void 0) 
				return val;	
			if (this.prefix())
				return true;	
			return false;
		}
		@$mol_mem()
		options() {
			return Object.keys(this.dictionary());
		}
		options_filtered () {
			let filter = this.prefix();
			return this.options().filter( id => {
				if( id !== this.value() )
					return this.option_label(id).toLowerCase().match( filter ) 
			})
		}
		option_label ( id: string ) {
			return (this.dictionary()[ id ])
			? this.dictionary()[ id ]()
			: id
		}
		@$mol_mem()
		option_focused( key: string ) {
			if(key === void 0) return ""
			if(this.expanded())
				$mol_view_selection.focused([this.Option(key).dom_node()])
			else
				this.value(key)
			return key
		}
		event_switch(event?: MouseEvent) {
			this.expanded(!this.expanded());
		}
		event_select ( id: string, event?: MouseEvent ) {
			this.value( id )
			this.expanded(false);
		}
		searchable() {
			return this.options().length >= this.search_breakpoint()
		}
		hint_message() {
			return this.option_label(this.value()) ||  this.message_empty();
		}
		controls() {
			return [
				(this.searchable() && !this.value() || this.searchable() && this.expanded())
					? this.String()
					: null ,
				this.Trigger()
			]
		}
		Options () {
			if(this.options_filtered().length === 0)
				return [ this.Option_no_value() ]
			else
				return this.options_filtered().map( ( option: string ) => this.Option( option ) )
		}
		value_content () {
			if (this.searchable())
				return (this.value() && !this.expanded())
					? this.option_content(this.value())
					: null
			else		
				return this.value()
					? this.option_content(this.value())
					: [ this.Option_empty() ]
		}	
	}
}
