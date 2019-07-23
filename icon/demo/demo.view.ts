namespace $.$$ {
	export class $mol_icon_demo extends $.$mol_icon_demo {

		@ $mol_mem
		icons_filtered() {
			return this.icons().filter( $mol_match_text( this.icons_filter() , icon => [ icon.constructor.name ] ) )
		}
		
	}
}
