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
			return (this.value())
				? this.optionerContent(this.value())
				: (this.options().length > this.minOptionsToSearch())
					? [ this.stringer() ]
					: [ this.emptyOptioner() ]
		}
		
		eventSelect ( id: string, event?: MouseEvent ) {
			this.value( id )
			this.expanded(false);
		}
		
		childs() {
			return [
				this.trigger(),
				(this.expanded())
					? this.lister()
					: null
			]
		}
		
		@$mol_mem()
		focused() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1 
		}
		
		@$mol_mem()
		expanded( val?: boolean ) {
			// if ( !this.focused() )
			// 	return false;	
			// 		
			// if (val !== void 0) 
			// 	return val;
			// 
			// if (this.prefix())
			// 	return true;
			
			return true;
		}
	}
}
