namespace $.$$ {
	export class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {

		@$mol_mem
		nearest() {
			let delta = this.threshold() ** 2
			const [cursor_x, cursor_y] = this.cursor_position()
			if (Number.isNaN(cursor_x) || Number.isNaN(cursor_y)) return null
			const graphs = this.graphs()
			let point: $mol_vector_2d<number> = null
			let label: $mol_vector_2d<number> = null
			for (let current of graphs) {
				const indexes = current.indexes()
				const series_x = current.series_x()
				const series_y = current.series_y()
				const [shift_x, shift_y] = current.shift()
				const [scale_x, scale_y] = current.scale()
	
				for (let index of indexes) {
					const point_x = shift_x + series_x[index] * scale_x
					const point_y = shift_y + series_y[index] * scale_y
					const diff = (point_x - cursor_x) ** 2 + (point_y - cursor_y) ** 2
					if (diff < delta) {
						delta = diff
						point = new $mol_vector_2d(point_x, point_y)
						label = new $mol_vector_2d(series_x[index], series_y[index])
					}
				}
			}
			if (!point) return null

			return {point, label}
		}

		curve() {
			const nearest = this.nearest()
			if (!nearest) return ''

			return `M ${nearest.point.x.toFixed(3)} 1000 V 0 M 0 ${nearest.point.y.toFixed(3)} H 2000`
		}

		title_x() {
			const nearest = this.nearest()
			if (!nearest) return ''

			return String(nearest.label.x)
		}

		title_x_pos_x() {
			const nearest = this.nearest()
			if (!nearest) return '0'

			const width = this.text_width(this.title_x())

			return (nearest.point.x - width / 2).toFixed(3)
		}

		title_x_pos_y() {
			const nearest = this.nearest()
			if (!nearest) return '0'

			const pos = this.size_real().y - this.title_x_gap()

			return pos.toFixed(3)
		}

		title_y() {
			const nearest = this.nearest()
			if (!nearest) return ''

			return String(nearest.label.y)
		}

		title_y_pos_y() {
			const nearest = this.nearest()
			if (!nearest) return '0'

			return nearest.point.y.toFixed(3)
		}
	}
}
