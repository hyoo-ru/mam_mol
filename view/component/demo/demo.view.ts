namespace $.$$ {
	export class $mol_view_component_demo extends $.$mol_view_component_demo {
		
		@ $mol_mem
		sel() {
			return this.$.$mol_view_selection.focused().map( el => el.localName + '#' + el.id ).join( ', ' )
		}
		
	}
	$mol_view_component( $mol_view_component_demo )
}
