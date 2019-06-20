namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		@$mol_mem
		filled(): Set<number> {
			return new Set()
		}

		@ $mol_mem
		points() {
			const radius = this.diameter() / 2
			// calculate by cpu
			const points_max = this.points_max()

			const viewport = this.viewport()
			const viewport_left = viewport[0][0] - radius
			const viewport_right = viewport[0][1] + radius
			const viewport_bottom = viewport[1][0] - radius
			const viewport_top = viewport[1][1] + radius

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()

			let last_x = Number.NEGATIVE_INFINITY
			let last_y = Number.NEGATIVE_INFINITY

			let spacing = 0
			let filled: Set<number> = this.filled() 
			let points_scaled: (readonly [number, number])[]

			const series_x = this.series_x()
			const series_y = this.series_y()
			do {
				points_scaled = []
				for (let i = 0; i < series_x.length; i++) {
					const point_x = series_x[i]
					const point_y = series_y[i]
					const scaled_x = Math.round(shift_x + point_x * scale_x)
					const scaled_y = Math.round(shift_y + point_y * scale_y)

					if (
						Math.abs( scaled_x - last_x ) < radius
						&& Math.abs( scaled_y - last_y ) < radius
					) continue

					last_x = scaled_x
					last_y = scaled_y

					if (scaled_x < viewport_left) continue
					if (scaled_y < viewport_bottom) continue
					if (scaled_x > viewport_right) continue
					if (scaled_y > viewport_top) continue

					if (spacing !== 0) {
						const key = $mol_coord_pack(
							Math.round(point_x * scale_x / spacing) * spacing,
							Math.round(point_y * scale_y / spacing) * spacing
						)
						if (filled.has(key)) continue

						filled.add(key)
					}

					points_scaled.push([scaled_x, scaled_y] as const)
					if (points_scaled.length > points_max) break
				}
				spacing += Math.ceil(radius)
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
