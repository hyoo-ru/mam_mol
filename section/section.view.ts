namespace $.$$ {

	/**
	 * The component which contains head and content.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_section_demo
	 */
	export class $mol_section extends $.$mol_section {
		
		title_dom_name() {
			return 'h' + this.level()
		}
		
	}
}
