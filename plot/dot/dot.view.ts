namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		@$mol_mem
		filled(): Set<number> {
			return new Set()
		}

		@ $mol_mem
		points() {
			const [[viewport_left, viewport_bottom], [viewport_right, viewport_top]] = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const points_scaled = [] as (readonly [number, number])[]

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const
			const radius = this.diameter() / 2

			const spacing_x = this.spacing() / scale_x
			const spacing_y = this.spacing() / scale_y
			const filled: Set<number> | null = spacing_x ? this.filled() : null

			for (let point of points_raw) {
				const scaled = [
					Math.round(shift_x + point[0] * scale_x),
					Math.round(shift_y + point[1] * scale_y),
				] as const

				if (
					Math.abs( scaled[0] - last[ 0 ] ) < radius
					&& Math.abs( scaled[1] - last[ 1 ] ) < radius
				) continue

				last = scaled

				if (scaled[0] < viewport_left) continue
				if (scaled[1] < viewport_bottom) continue
				if (scaled[0] > viewport_right) continue
				if (scaled[1] > viewport_top) continue

				if (filled) {
					const key = Math.round(Math.round(point[0] / spacing_x) * spacing_x)
						+ (Math.round(Math.round(point[1] / spacing_y) * spacing_y) << 14)
					if (filled.has(key)) continue

					filled.add(key)
				}

				points_scaled.push(scaled)
			}
			filled && filled.clear()

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
