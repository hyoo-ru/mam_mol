namespace $.$$ {
	export class $mol_svg_text_box extends $.$mol_svg_text_box {

		box_width() {
			return `${ this.width() }px`
		}

		@ $mol_mem
		width() {
			return $mol_font_measure(
				this.font_size(),
				this.font_family(),
				this.text(),
			)
		}

		box_pos_x() {
			const align = this.align()
			if (align === 'end') return `calc(${this.pos_x()} - ${this.width()})`
			if (align === 'middle') return `calc(${this.pos_x()} - ${Math.round(this.width() / 2)})`

			return this.pos_x()
		}

		box_pos_y() {
			return `calc(${this.pos_y()} - ${this.font_size() - 2})`
		}
	}
	
}
