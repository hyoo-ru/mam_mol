namespace $.$mol {

	export class $mol_ghost extends $.$mol_ghost {
		
		dom_node() { 
			return $mol_view_dom.node( this.Sub() )
		}
		
		render() {
			this.Sub().render()
			return super.render()
		}
		
	}

}
