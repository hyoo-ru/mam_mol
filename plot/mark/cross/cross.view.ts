namespace $.$$ {
	export class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {

		@$mol_mem
		nearest_index(): number {
			const [cursor_x, cursor_y] = this.cursor_position()
			if (cursor_x === -1 || cursor_y === -1) return -1

			const series_x = this.series_x()
			const series_y = this.series_y()
			const [scale_x, scale_y] = this.scale()
			const [shift_x, shift_y] = this.shift()
			const [[viewport_left, viewport_right], [viewport_bottom, viewport_top]] = this.viewport()
			let delta_x = Number.POSITIVE_INFINITY
			let delta_y = Number.POSITIVE_INFINITY
			let index = -1
			for (let i = 0; i < series_x.length; i++) {
				const scaled_x = Math.round(shift_x + series_x[i] * scale_x)
				const scaled_y = Math.round(shift_y + series_y[i] * scale_y)

				if (scaled_x < viewport_left) continue
				if (scaled_x > viewport_right) continue
				if (scaled_y < viewport_bottom) continue
				if (scaled_y > viewport_top) continue
				const diff_x = Math.abs(scaled_x - cursor_x)
				const diff_y = Math.abs(scaled_y - cursor_y)
				if (diff_x < delta_x && diff_y < delta_y) {
					delta_x = diff_x
					delta_y = diff_y
					index = i
				}
			}

			return index
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

		title_pos_x() {
			const index = this.nearest_index()
			if (index < 0) return '0'

			const title = this.nearest_title()
			const [real_x] = this.size_real()
			const [scale_x,] = this.scale()
			const [shift_x,] = this.shift()
			const width = this.text_width(title)
			const gap = this.gap_x()
			let point_x = shift_x + this.series_x()[index] * scale_x + gap
			if (point_x + width > real_x) point_x -= width + gap + gap

			return `${point_x.toFixed(3)}px`
		}

		title_pos_y() {
			const index = this.nearest_index()
			if (index < 0) return '0'

			const [, scale_y] = this.scale()
			const [, shift_y] = this.shift()
			const gap = this.gap_y()
			const height = this.font_size()
			let point_y = shift_y + this.series_y()[index] * scale_y - gap
			if (point_y - height < 0) point_y += height + gap + gap

			return `${point_y.toFixed(3)}px`
		}

		nearest_title() {
			const index = this.nearest_index()
			if (index < 0) return ''
			const point_x = this.labels()[index]
			const point_y = String(this.series_y()[index])

			return this.title().replace('%x', point_x).replace('%y', point_y)
		}

		@$mol_mem
		dimensions() {
			return new this.$.$mol_vector_2d(
				$mol_vector_range_full.inversed,
				$mol_vector_range_full.inversed
			)
		}
	}
}
