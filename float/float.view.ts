namespace $.$$ {
	export class $mol_float extends $.$mol_float {

		shiftStyle() {
			const offset_y = this.vertical() ? this.$.$mol_scroll_top() : 0
			const offset_x = this.horizontal() ? this.$.$mol_scroll_left() : 0
			
			return `translate( ${ offset_x }px , ${ offset_y }px )`
		}

		scrolling() {
			return this.$.$mol_scroll_moving()
		}

	}
}
