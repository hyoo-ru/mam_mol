namespace $.$$ {
	export class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
		@ $mol_mem
		series_x() {
			return this.labels().map((val, index) => index)
		}
		
		@ $mol_mem
		points_record() {
			const count = 10
			const series_x = this.series_x()
			const labels = this.labels()
			const precision = this.precision()
			const [[viewport_left,], [viewport_right,]] = this.viewport()
			const step = (viewport_right - viewport_left) / count
			const [shift_x, ] = this.shift()
			const [scale_x, ] = this.scale()

			let current = 0

			const points = [] as number[]
			const labels_viewport = [] as string[]
			for (let i = 0; i < series_x.length; i++) {
				const point_x = series_x[i]
				const scaled_x = shift_x + point_x * scale_x
				if (scaled_x > viewport_right) continue
				if (scaled_x < viewport_left) continue
				if (scaled_x < current) continue

				labels_viewport.push(labels.length > i ? labels[i] : point_x.toFixed(precision))
				points.push(point_x)
				if (current === 0) current += point_x
				current += step
			}

			return {points, labels: labels_viewport} as const
		}

		points() {
			return this.points_record().points
		}

		label_text( index : number ) {
			return this.points_record().labels[index]
		}
	}
}
