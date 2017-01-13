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
		}
	}
}
