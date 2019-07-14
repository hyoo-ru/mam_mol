namespace $.$$ {
	export class $mol_plot_fill extends $.$mol_plot_fill {

		@ $mol_mem
		indexes() {
			const threshold = this.threshold()
			const {
				x: {min: viewport_left, max: viewport_right},
				y: {min: viewport_bottom, max: viewport_top},
			} = this.viewport()
			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const indexes = [] as number[]

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const

			let first_x = null as number | null
			let first_y = null as number | null
			let last_x = null as number | null
			let last_y = null as number | null

			const series_x = this.series_x()
			const series_y = this.series_y()
			for (let i = 0; i < series_x.length; i++) {
				const scaled = [
					Math.round( shift_x + series_x[i] * scale_x ),
					Math.round( shift_y + series_y[i] * scale_y ),
				] as const

				if (
					Math.abs( scaled[0] - last[ 0 ] ) < threshold
					&& Math.abs( scaled[1] - last[ 1 ] ) < threshold
				) continue

				last = scaled

				if (scaled[0] < viewport_left) {
					first_x = i
					continue
				}

				if (scaled[1] < viewport_bottom) {
					first_y = i
					continue
				}

				if (scaled[0] > viewport_right) {
					last_x = i
					continue
				}

				if (scaled[1] > viewport_top) {
					last_y = i
					continue
				}

				if (first_x !== null) indexes.push(first_x)
				if (first_y !== null) indexes.push(first_y)

				indexes.push(i)

				if (last_x !== null) indexes.push(last_x)
				if (last_y !== null) indexes.push(last_y)

				first_x = first_y = last_x = last_y = null
			}

			if (first_x !== null) indexes.push(first_x)
			if (first_y !== null) indexes.push(first_y)
			if (last_x !== null) indexes.push(last_x)
			if (last_y !== null) indexes.push(last_y)

			return indexes
		}

		curve() {
			const points = this.points()
			if( points.length === 0 ) return ''
			
			const [, shift_y] = this.shift()

			const main = points.map( point => `L ${point.join(' ')}`).join(' ')

			return `M ${points[0].join(' ')} ${main} V ${shift_y} H ${points[0][0]}`
		}
		
		back() {
			return [ this ]
		}
		
	}
}
