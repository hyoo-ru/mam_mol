namespace $.$mol {
	export class $mol_floater extends $.$mol_floater {

		shiftStyle() {
			const context = this.context()
			const offset = context.$mol_scroller_scrollTop()

			return `translateY(${ offset }px)`
		}

		scrolling() {
			return this.context().$mol_scroller_moving()
		}

	}
}
