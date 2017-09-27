namespace $.$$ {
	export class $mol_float extends $.$mol_float {

		shiftStyle() {
			const offset_y = this.vertical() ? this.$.$mol_scroll_top() : 0
			const offset_x = this.horizontal() ? this.$.$mol_scroll_left() : 0
			
			return `translate( ${ offset_x }px , ${ offset_y }px )`
		}

		scrolling() {
			if( this.horizontal() && this.$.$mol_scroll_moving_hor() ) return true
			if( this.vertical() && this.$.$mol_scroll_moving_vert() ) return true
			return false
		}

	}
}
