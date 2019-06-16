namespace $.$$ {
	export class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
		@ $mol_mem
		series_x(): number[] {
			return this.labels().map((val, index) => index)
		}

		@ $mol_mem
		labels(): string[] {
			const precision = this.precision()
			return this.series_x().map(val => val.toFixed(precision))
		}

		@ $mol_mem
		step() {
			const count = 10
			const [[viewport_left,], [viewport_right,]] = this.viewport()
			return (viewport_right - viewport_left) / count
		}

		@ $mol_mem
		indexes() {
			const series_x = this.series_x()
			const [shift_x, ] = this.shift()
			const [scale_x, ] = this.scale()
			const [[viewport_left,], [viewport_right,]] = this.viewport()
			const step = this.step()

			let current = 0

			const indexes = [] as number[]
			for (let i = 0; i < series_x.length; i++) {
				const point_x = series_x[i]
				const scaled_x = shift_x + point_x * scale_x
				if (scaled_x > viewport_right) continue
				if (scaled_x < viewport_left) continue
				if (scaled_x < current) continue
				indexes.push(i)

				if (current === 0) current += point_x
				current += step
			}

			return indexes

		}

		points() {
			const [shift_x, ] = this.shift()
			const [scale_x, ] = this.scale()
			const series_x = this.series_x()

			return this.indexes().map(index => shift_x + series_x[index] * scale_x)
		}

		labels_viewport() {
			const labels = this.labels()
			return this.indexes().map(index => labels[index])
		}

		label_text( viewport_index : number ) {
			return this.labels_viewport()[viewport_index]
		}
	}
}
