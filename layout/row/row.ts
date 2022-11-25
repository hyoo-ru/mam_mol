namespace $ {

	/** Row layout. */
	export class $mol_layout_row extends $mol_layout_flex {
		
		ortho = $mol_layout_stack.make({})
		
		down() {
			super.down()
			this.ortho.kids = this.kids.map( kid => kid.ortho! )
		}
		
	}
	
}
