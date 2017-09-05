namespace $.$$ {
	export class $mol_float extends $.$mol_float {

		shiftStyle() {
			const offset = this.$.$mol_scroll_top()

			return `translateY(${ offset }px)`
		}

		scrolling() {
			return this.$.$mol_scroll_moving()
		}

	}
}
