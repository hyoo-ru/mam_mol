namespace $.$$ {
	export class $mol_plot_line extends $.$mol_plot_line {
		@ $mol_mem
		points() {
			const threshold = this.threshold()
			const size = this.size_real()

			const viewport_left = - threshold
			const viewport_right = size[0] + threshold
			const viewport_bottom = - threshold
			const viewport_top = size[1] + threshold

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const points_scaled = [] as (readonly [number, number])[]

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const

			let gain_first = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const
			let gain_last = [ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] as const
			const gain_height = this.gain_height()
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
					if (!gain_height && gain_first[0] < scaled[0]) gain_first = scaled
					continue
				}

				if (scaled[0] > viewport_right) {
					if (!gain_height && gain_last[0] > scaled[0]) gain_last = scaled
					continue
				}

				if (scaled[1] < viewport_bottom) {
					if (gain_height && gain_first[1] < scaled[1]) gain_first = scaled
					continue
				}

				if (scaled[1] > viewport_top) {
					if (gain_height && gain_last[1] > scaled[1]) gain_last = scaled
					continue
				}

				points_scaled.push(scaled)
			}

			return {scaled: points_scaled, first: gain_first, last: gain_last} as const
		}

		gain_detected() {
			const points = this.points()

			return points.first[0] !== Number.NEGATIVE_INFINITY
				&& points.last[0] !== Number.POSITIVE_INFINITY
		}

		curve() {
			const {scaled, first, last} = this.points()
			if( scaled.length === 0 && !this.gain_detected() ) return ''
			const first_data = first[0] === Number.NEGATIVE_INFINITY
				? `${scaled[0][0]} ${scaled[0][1]}`
				: `${first[0]} ${first[1]} L ${first[0]} ${first[1]}`
			const last_data = last[0] === Number.POSITIVE_INFINITY
				? ''
				: ` L ${last[0]} ${last[1]}`

			return `M ${first_data} ${scaled.map( point => `L ${point[0]} ${point[1]}` ).join( ' ' )}${last_data}`
		}
		
	}
}
