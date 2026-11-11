namespace $.$$ {
	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_demo
	 */
	export class $mol_form_field extends $.$mol_form_field {
		
		override state() {
			return $mol_error_fence(
				() => this.bid() ? 'bid' as string: null,
				e => ($mol_fail_log(e), 'bid'),
				p => null // do not flash all form field if bid is async
			)
		}
		override label() {
			this.bid() // flash label if bids async
			return super.label()
		}

		@ $mol_mem
		bid() {
			return this.bids().filter( Boolean )[ 0 ] ?? ''
		}
		
	}
}
