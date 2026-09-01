namespace $.$$ {

	/**
	 * Component to see progress state of any operation.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_portion_demo
	 */
	export class $mol_portion extends $.$mol_portion {
		
		indicator_width_style() {
			return this.portion() * 100 + '%'
		}
		
	}
}
