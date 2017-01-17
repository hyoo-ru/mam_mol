namespace $.$mol {

	export class $mol_selecter extends $.$mol_selecter {
		optionLabel ( id: string ) {
			return id;
		}
		
		optionsFiltered () {
			let filter = this.prefix();
			return this.options().filter( id => {
				if( id !== this.value() )
					return id.toLowerCase().match( filter ) 
			})
		}
		
		optioners () {
			return this.optionsFiltered().map( ( option: string ) => this.optioner( option ) )
		}
		
		selectedOption () {
			if(this.value())
				return this.optionerContent(this.value())
			else 
				return (!this.searcheble())
					? [ this.emptyOptioner() ]
					: null
		}
		
		searcheble() {
			return this.options().length >= this.minOptionsToSearch();
		}
		
		eventSelect ( id: string, event?: MouseEvent ) {
			this.value( id )
			this.expanded(false);
		}
		
		childs() {
			return [
				this.barer(),
				(this.expanded())
					? this.lister()
					: null
			]
		}
		
		controls() {
			return [
				(this.searcheble() && !this.value())
					? this.stringer()
					: null ,
				this.trigger()
			]
		}
		
		eventSwitch(event?: MouseEvent) {
			this.expanded(!this.expanded());
		}
		
		@$mol_mem()
		focused() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1 
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
	}
}
