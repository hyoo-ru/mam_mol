namespace $.$$ {
	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_demo
	 */
	export class $mol_form_field extends $.$mol_form_field {
		
		override state() {
			return $mol_error_fence(
				() => this.bid() ? 'bid' as string: null,
				e => e,
				p => null // do not flash all form field if bid is async
			)
		}

		override label() {
			// flash label if bids async
			// bid handles error - prevent hiding label on first fetch error
			this.bid()
			return super.label()
		}

		@ $mol_mem
		bid() {
			return $mol_error_fence(
				() => this.bids().filter( Boolean )[ 0 ] ?? '',
				e => ($mol_fail_log(e), this.$.$mol_error_message(e)),
			)
		}
		
	}
}
