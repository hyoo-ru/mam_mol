namespace $.$$ {
	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_demo
	 */
	export class $mol_form_field extends $.$mol_form_field {
		
		@ $mol_mem
		bid() {
			return this.bids().filter( Boolean )[ 0 ] ?? ''
		}
		
	}
}
