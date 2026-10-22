namespace $.$$ {
	export class $mol_svg_text_box extends $.$mol_svg_text_box {

		box_width() {
			return this.width().toFixed(2)
		}

		box_height() {
			return this.font_size().toFixed(2)
		}

		@ $mol_mem
		width() {
			return $mol_font_measure(
				this.font_size() + 'px ' + this.font_family(),
				this.text(),
			)
		}

		to_px(key: 'width' | 'height', val: string) {
			if (val.endsWith('%')) {
				return Number(val.replace('%', '')) / (this.view_rect()?.[key] || 1)
			}

			return Number(val.replace('px', ''))
		}

		pos_x_number() {
			return this.to_px('width', this.pos_x())
		}

		box_pos_x() {
			const align = this.align()
			if (align === 'end') return (this.pos_x_number() - this.width()).toFixed(2)
			if (align === 'middle') return (this.pos_x_number() - Math.round(this.width() / 2)).toFixed(2)

			return this.pos_x()
		}

		box_pos_y() {
			const pos_y = this.to_px('height', this.pos_y())

			return (pos_y - this.font_size() - 2).toFixed(2)
		}
	}
	
}
