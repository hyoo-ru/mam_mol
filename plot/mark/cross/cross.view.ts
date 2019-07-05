namespace $.$$ {
	export class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {

		@$mol_mem
		nearest(): readonly [number, number] {
			let delta = Number.POSITIVE_INFINITY
			let index = -1
			const [cursor_x, cursor_y] = this.cursor_position()
			if (Number.isNaN(cursor_x) || Number.isNaN(cursor_y)) return [index, delta]

			const series_x = this.series_x()
			const series_y = this.series_y()
			const [scale_x, scale_y] = this.scale()
			const [shift_x, shift_y] = this.shift()
			const [[viewport_left, viewport_right], [viewport_bottom, viewport_top]] = this.viewport()
			for (let i = 0; i < series_x.length; i++) {
				const scaled_x = Math.round(shift_x + series_x[i] * scale_x)
				const scaled_y = Math.round(shift_y + series_y[i] * scale_y)

				if (scaled_x < viewport_left) continue
				if (scaled_x > viewport_right) continue
				if (scaled_y < viewport_bottom) continue
				if (scaled_y > viewport_top) continue
				const diff = Math.abs(scaled_x - cursor_x) + Math.abs(scaled_y - cursor_y)
				if (diff < delta) {
					delta = diff
					index = i
				}
			}

			return [index, delta]
		}

		nearest_delta() {
			return this.nearest()[1]
		}

		nearest_index() {
			return this.nearest()[0]
		}

		curve() {
			const index = this.nearest_index()
			if (index < 0) return ''

			const [scale_x, scale_y] = this.scale()
			const [shift_x, shift_y] = this.shift()
			const point_x = (shift_x + this.series_x()[index] * scale_x).toFixed(3)
			const point_y = (shift_y + this.series_y()[index] * scale_y).toFixed(3)

			return `M ${point_x} 1000 V 0 M 0 ${point_y} H 2000`
		}

		title_x() {
			const index = this.nearest_index()
			if (index < 0) return ''
			const labels = this.labels()
			if (labels.length > index) return labels[index]

			return String(this.series_x()[index])
		}

		title_x_pos_x() {
			const index = this.nearest_index()
			if (index < 0) return '0'

			const gap = this.gap()
			const center = this.shift()[0] + this.series_x()[index] * this.scale()[0]
			let pos = center + gap
			const width = this.text_width(this.title_x())
			if (pos > this.size_real()[0] - width) pos = center - width - gap

			return pos.toFixed(3)
		}

		title_x_pos_y() {
			const index = this.nearest_index()
			if (index < 0) return '0'
			const size = this.font_size()
			const center = this.shift()[1] + this.series_y()[index] * this.scale()[1]
			let pos = size
			if (pos > center + this.gap()) pos = this.size_real()[1] - size

			return pos.toFixed(3)
		}

		title_y() {
			const index = this.nearest_index()
			if (index < 0) return ''

			return String(this.series_y()[index])
		}

		title_y_pos_x() {
			const index = this.nearest_index()
			if (index < 0) return '0'

			const width = this.text_width(this.title_y())
			const center = this.shift()[0] + this.series_x()[index] * this.scale()[0]
			let pos = this.size_real()[0] - width
			if (pos < center - this.gap()) pos = 0

			return pos.toFixed(3)
		}

		title_y_pos_y() {
			const index = this.nearest_index()
			if (index < 0) return '0'

			const gap = this.gap()
			const height = this.font_size()
			const center = this.shift()[1] + this.series_y()[index] * this.scale()[1]
			let pos = center - gap
			if (pos < height) pos = center + height + gap

			return pos.toFixed(3)
		}
	}
}
