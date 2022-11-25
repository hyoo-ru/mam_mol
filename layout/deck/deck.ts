namespace $ {

	/** Layered layout. */
	export class $mol_layout_deck extends $mol_layout_stack {
		
		ortho = $mol_layout_stack.make({})
		
		down() {
			super.down()
			this.ortho.kids = this.kids.map( kid => kid.ortho! )
		}
		
	}
	
}
