namespace $.$mol {

	export class $mol_selecter extends $.$mol_selecter {
		expanded() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1
		}
	}
}
