namespace $.$$ {
	export class $mol_plot_bar extends $.$mol_plot_bar {
		@$mol_mem
		points() {
			const [[viewport_left, viewport_right], [viewport_bottom, viewport_top]] = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_scaled = [] as (readonly [number, number])[]

			let first_x = null as readonly [number, number] | null
			let first_y = null as readonly [number, number] | null
			let last_x = null as readonly [number, number] | null
			let last_y = null as readonly [number, number] | null

			const series_x = this.series_x()
			const series_y = this.series_y()
			for (let i = 0; i < series_x.length; i++) {
				const scaled = [
					Math.round( shift_x + series_x[i] * scale_x ),
					Math.round( shift_y + series_y[i] * scale_y ),
				] as const

				if (scaled[0] < viewport_left) {
					first_x = scaled
					continue
				}

				if (scaled[1] < viewport_bottom) {
					first_y = scaled
					continue
				}

				if (scaled[0] > viewport_right) {
					last_x = scaled
					continue
				}

				if (scaled[1] > viewport_top) {
					last_y = scaled
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

			return points_scaled
		}

		curve() {
			const shift = this.shift()

			return this.points().map( point => `M ${ point[0] } ${ shift[1] } V ${ point[1] }` ).join( ' ' ) || ''
		}
		
		stroke_width() {
			return ( 8 / Math.sqrt( this.points().length ) ).toPrecision(2) + '%'
		}
		
		color() {
			return `hsl( ${ this.hue() } , 70% , 85% )`
		}
		
		@ $mol_mem
		dimensions() {
			let next = new $mol_vector_2d(
				new $mol_vector_range(Number.POSITIVE_INFINITY , 0),
				new $mol_vector_range(Number.NEGATIVE_INFINITY , 0),
			)
			
			const series_x = this.series_x()
			const series_y = this.series_y()
			for (let i = 0; i < series_x.length; i++) {
				next = next.expanded1([series_x[i], series_y[i]] as const)
			}
			
			const gap = ( next[0][1] - next[0][0] ) / series_x.length || 0.00000001
			next[0] = next[0].added1([-gap, gap] as const)
			
			return next
		}
		
	}
}
