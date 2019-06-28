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
		visible_indexes() {
			const series_x = this.series_x()
			const [shift_x,] = this.shift()
			const [scale_x,] = this.scale()
			const step = this.step() * scale_x
			const [[viewport_left, viewport_right]] = this.viewport()

			let current = 0

			const indexes = [] as number[]
			let last = 0
			for (let i = 0; i < series_x.length; i++) {
				const point_x = series_x[i]
				const scaled_x = (shift_x + point_x * scale_x)
				if (scaled_x < viewport_left) continue
				if (scaled_x > viewport_right) continue
				if (current === 0) current = scaled_x
				if (scaled_x < current) {
					last = i
					continue
				}
				indexes.push(i)
				current += step
				last = 0
			}
			if (last !== 0) indexes.push(last)

			return indexes

		}

		curve() {
			const [shift] = this.shift()
			const [scale] = this.scale()
			const series_x = this.series_x()

			return this.visible_indexes().map( index => {
				const scaled = series_x[index] * scale + shift
				return `M ${ scaled.toFixed(3) } 1000 V 0`
			}).join( ' ' )
		}

		label_text( index : number ) {
			return this.labels()[index]
		}

		labels_formatted() {
			return this.visible_indexes().map( index => this.Label( index ) )
		}

		label_pos_x( index : number ) {
			return (this.series_x()[index] * this.scale()[0] + this.shift()[0]).toFixed(3) + 'px'
		}

		label_pos_y( index : number ) {
			return this.title_pos_y()
		}
	}
}
