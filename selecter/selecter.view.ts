namespace $.$mol {

	export class $mol_selecter extends $.$mol_selecter {
		optionLabel( id: string ) {
			return id;
		}
		
		optioners() {
			return this.options().map( ( option: string ) => this.optioner( option ) )
		}
	}
}
