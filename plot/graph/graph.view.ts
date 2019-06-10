namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		@ $mol_mem
		points_raw(): [number, number][] {
			const series = this.series()
			
			return Object.keys( series ).map( (key, index) => [
				isNaN( Number( key ) ) ? index : Number( key ) ,
				series[ key ] ,
			] )
		}

		@ $mol_mem
		points_viewport() {
			const threshold = this.threshold()
			const size = this.size_real()

			const viewport_left = - threshold
			const viewport_right = size[0] + threshold
			const viewport_bottom = - threshold
			const viewport_top = size[1] + threshold

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const next = {
				scaled: [] as (readonly [number, number])[],
				raw: [] as (readonly [number, number])[],
			}

			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const

			let first_x: [readonly [number, number], readonly [number, number]] | null = null
			let first_y: [readonly [number, number], readonly [number, number]] | null = null
			let last_x: [readonly [number, number], readonly [number, number]] | null = null
			let last_y: [readonly [number, number], readonly [number, number]] | null = null

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
					first_x = [scaled, point]
					continue
				}

				if (scaled[0] > viewport_right) {
					if (!last_x) last_x = [scaled, point]
					continue
				}

				if (scaled[1] < viewport_bottom) {
					first_y = [scaled, point]
					continue
				}

				if (scaled[1] > viewport_top) {
					if (!last_y) last_y = [scaled, point]
					continue
				}

				if (first_x) {
					next.scaled.push(first_x[0])
					next.raw.push(first_x[1])	
					first_x = null
				}

				if (first_y) {
					next.scaled.push(first_y[0])
					next.raw.push(first_y[1])	
					first_y = null
				}

				next.scaled.push(scaled)
				next.raw.push(point)
			}

			if (first_x) {
				next.scaled.push(first_x[0])
				next.raw.push(first_x[1])	
			}

			if (first_y) {
				next.scaled.push(first_y[0])
				next.raw.push(first_y[1])	
			}

			if (last_x) {
				next.scaled.push(last_x[0])
				next.raw.push(last_x[1])	
			}

			if (last_y) {
				next.scaled.push(last_y[0])
				next.raw.push(last_y[1])	
			}

			return next
		}

		points() {
			return this.points_viewport().scaled
		}
		
		@ $mol_mem
		dimensions() {
			const points = this.points_raw()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			] as [[number, number], [number,number]]
			
			for(let point of points) {
				if( point[0] < next[0][0] ) next[0][0] = point[0]
				if( point[1] < next[0][1] ) next[0][1] = point[1]
				if( point[0] > next[1][0] ) next[1][0] = point[0]
				if( point[1] > next[1][1] ) next[1][1] = point[1]
			}
			
			return next
		}
		
		color() {
			const hue = this.hue()
			return hue ? `hsl( ${ hue } , 100% , 35% )` : ''
		}
		
		front() {
			return [ this ]
		}
		
	}
}
