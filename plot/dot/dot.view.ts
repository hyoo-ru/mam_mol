namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		@$mol_mem
		filled(): Set<number> {
			return new Set()
		}

		@ $mol_mem
		points() {
			const diameter = this.diameter()
			const threshold = diameter / 2
			// calculate by cpu
			const points_max = 1000

			const [[viewport_left, viewport_bottom], [viewport_right, viewport_top]] = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const

			let spacing_x = 0
			let spacing_y = 0
			let filled: Set<number> = this.filled() 
			let points_scaled: (readonly [number, number])[]

			do {
				points_scaled = []
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

					if (scaled[0] < viewport_left) continue
					if (scaled[1] < viewport_bottom) continue
					if (scaled[0] > viewport_right) continue
					if (scaled[1] > viewport_top) continue

					if (spacing_x !== 0) {
						const key = Math.round(Math.round(point[0] / spacing_x) * spacing_x)
							+ (Math.round(Math.round(point[1] / spacing_y) * spacing_y) << 14)
						if (filled.has(key)) continue

						filled.add(key)
					}

					points_scaled.push(scaled)
					if (points_scaled.length > points_max) break
				}
				spacing_x += threshold / scale_x
				spacing_y += threshold / scale_y
				filled.clear()
			} while (points_scaled.length > points_max)

			return points_scaled
		}

		@ $mol_mem
		curve() {
			const points = this.points()
			if( points.length === 0 ) return ''

			return this.points().map( point => 'M ' + point.join( ' ' ) + ' v 0' ).join( ' ' ) || ''
		}
		
	}
}
