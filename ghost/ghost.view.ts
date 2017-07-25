namespace $.$mol {

	export class $mol_ghost extends $.$mol_ghost {
		
		dom_node() { 
			return this.Sub().dom_node()
		}
		
		render() {
			this.Sub().render()
			super.render()
		}
		
	}

}
