namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		threshold() {
			return this.diameter() / 2
		}

		@ $mol_mem
		points() {
			const threshold = this.threshold()
			const [[viewport_left, viewport_bottom], [viewport_right, viewport_top]] = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const points_scaled = [] as (readonly [number, number])[]

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const
			const diameter = this.diameter() + this.point_gap()
			let gain_detected = false
			const filled: Set<number> = new Set()
			for (let point of points_raw) {
				const scaled = [
					Math.round(shift_x + point[0] * scale_x),
					Math.round(shift_y + point[1] * scale_y),
				] as const

				if (
					Math.abs( scaled[0] - last[ 0 ] ) < threshold
					&& Math.abs( scaled[1] - last[ 1 ] ) < threshold
				) continue

				last = scaled

				if (scaled[0] < viewport_left) {
					gain_detected = true
					continue
				}

				if (scaled[1] < viewport_bottom) {
					gain_detected = true
					continue
				}

				if (scaled[0] > viewport_right) {
					gain_detected = true
					continue
				}

				if (scaled[1] > viewport_top) {
					gain_detected = true
					continue
				}

				const key = (Math.round(scaled[0] / diameter) * diameter)
					+ ((Math.round(scaled[1] / diameter) * diameter) << 14)
				if (filled.has(key)) continue

				filled.add(key)

				points_scaled.push(scaled)
			}

			return {scaled: points_scaled, gain_detected} as const
		}

		@ $mol_mem
		curve() {
			const scaled = this.points().scaled
			if( scaled.length === 0 ) return ''

			return this.points().scaled.map( point => 'M ' + point.join( ' ' ) + ' v 0' ).join( ' ' ) || ''
		}
		
	}
}
