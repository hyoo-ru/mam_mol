namespace $ {

	/** Column layout. */
	export class $mol_layout_col extends $mol_layout_stack {
		
		ortho = $mol_layout_flex.make({})
		
		down() {
			super.down()
			this.ortho.kids = this.kids.map( kid => kid.ortho! )
		}
		
	}
	
}
