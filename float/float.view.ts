namespace $.$mol {
	export class $mol_float extends $.$mol_float {

		shiftStyle() {
			const context = this.context()
			const offset = context.$mol_scroll_scroll_top()

			return `translateY(${ offset }px)`
		}

		scrolling() {
			return this.context().$mol_scroll_moving()
		}

	}
}
