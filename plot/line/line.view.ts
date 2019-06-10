namespace $.$$ {
	export class $mol_plot_line extends $.$mol_plot_line {
		@ $mol_mem
		points() {
			const threshold = this.threshold()
			const [[viewport_left, viewport_bottom], [viewport_right, viewport_top]] = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const points_scaled = [] as (readonly [number, number])[]

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const

			let first_x = null as readonly [number, number] | null
			let first_y = null as readonly [number, number] | null
			let last_x = null as readonly [number, number] | null
			let last_y = null as readonly [number, number] | null

			let gain_detected = false
			for (let point of points_raw) {
				const scaled = [
					Math.round( shift_x + point[0] * scale_x ),
					Math.round( shift_y + point[1] * scale_y ),
				] as const

				if (
					Math.abs( scaled[0] - last[ 0 ] ) < threshold
					&& Math.abs( scaled[1] - last[ 1 ] ) < threshold
				) continue

				last = scaled

				if (scaled[0] < viewport_left) {
					first_x = scaled
					gain_detected = true
					continue
				}

				if (scaled[1] < viewport_bottom) {
					first_y = scaled
					gain_detected = true
					continue
				}

				if (scaled[0] > viewport_right) {
					last_x = scaled
					gain_detected = true
					continue
				}

				if (scaled[1] > viewport_top) {
					last_y = scaled
					gain_detected = true
					continue
				}

				if (first_x) points_scaled.push(first_x)
				if (first_y) points_scaled.push(first_y)

				points_scaled.push(scaled)

				if (last_x) points_scaled.push(last_x)
				if (last_y) points_scaled.push(last_y)

				first_x = first_y = last_x = last_y = null
			}

			if (first_x) points_scaled.push(first_x)
			if (first_y) points_scaled.push(first_y)
			if (last_x) points_scaled.push(last_x)
			if (last_y) points_scaled.push(last_y)

			return {scaled: points_scaled, gain_detected} as const
		}

		curve() {
			const scaled = this.points().scaled
			if( scaled.length === 0 ) return ''

			return `M ${scaled.join(' ')} ${scaled.map( point => `L ${point.join(' ')}` ).join( ' ' )}`
		}
		
	}
}
