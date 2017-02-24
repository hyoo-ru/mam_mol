namespace $.$mol {

	export class $mol_ghost extends $.$mol_ghost {
		
		dom_node() {
			return this.Sub().dom_node()
		}
		
		dom_tree() {
			super.dom_tree()
			
			const sub = this.Sub()
			
			sub.context( this.context_sub() )
			
			return sub.dom_tree()
		}
		
	}

}
