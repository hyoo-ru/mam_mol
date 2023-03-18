namespace $.$$ {
	/**
	 * Component which expands any content on title click.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_expander_demo
	 */
	export class $mol_expander extends $.$mol_expander {
		
		@ $mol_mem
		rows() {
			return [
				this.Label(),
				... this.expanded() ? [ this.Content() ] : []
			]
		}
		
		expandable() {
			return this.content().length > 0
		}
		
	}
}

