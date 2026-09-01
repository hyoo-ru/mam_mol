namespace $.$$ {
	export class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {

		@$mol_mem
		nearest() {
			let delta = this.threshold() ** 2
			const [cursor_x, cursor_y] = this.cursor_position()
			if (Number.isNaN(cursor_x) || Number.isNaN(cursor_y)) return null
			const graphs = this.graphs()
			let index: number = 0
			let graph: $.$mol_plot_graph = null as any
			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			for (let current of graphs) {
				const indexes = current.indexes()
				const series_x = current.series_x()
				const series_y = current.series_y()
	
				for (let i of indexes) {
					const point_x = shift_x + series_x[i] * scale_x
					const point_y = shift_y + series_y[i] * scale_y
					const diff = (point_x - cursor_x) ** 2 + (point_y - cursor_y) ** 2
					if (diff < delta) {
						delta = diff
						index = i
						graph = current
					}
				}
			}

			if (!graph) return null

			const value = new $mol_vector_2d(graph.series_x()[index], graph.series_y()[index])
			const scaled = new $mol_vector_2d(shift_x + value.x * scale_x, shift_y + value.y * scale_y)

			return {value, scaled, index}
		}

		curve() {
			const nearest = this.nearest()
			if (!nearest) return ''
			return `M ${nearest.scaled.x.toFixed(3)} 1000 V 0 M 0 ${nearest.scaled.y.toFixed(3)} H 2000`
		}

		title_x() {
			const nearest = this.nearest()
			if (!nearest) return ''

			const labels = this.labels()

			if (labels.length > nearest.index) return labels[nearest.index]

			return String(nearest.value.x)
		}

		title_x_pos_x() {
			const nearest = this.nearest()
			if (!nearest) return '0'
			const width = this.Label_x().width()

			return (nearest.scaled.x - width / 2).toFixed(3)
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

			return String(nearest.value.y)
		}

		title_y_pos_y() {
			const nearest = this.nearest()
			if (!nearest) return '0'

			return nearest.scaled.y.toFixed(3)
		}

		title_y_pos_x() {
			const nearest = this.nearest()
			if (!nearest) return '0'

			const pos = this.title_y_gap()

			return pos.toFixed(3)
		}

	}
}
