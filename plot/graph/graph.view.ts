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
			for (let index = 0; index < points_raw.length; index++) {
				const point = points_raw[index]
				const scaled = [
					Math.round( shift_x + point[0] * scale_x ),
					Math.round( shift_y + point[1] * scale_y ),
				] as const

				if (
					Math.abs( scaled[0] - last[ 0 ] ) < threshold
					&& Math.abs( scaled[1] - last[ 1 ] ) < threshold
				) continue

				last = scaled

				if (scaled[0] < viewport_left || scaled[0] > viewport_right) continue
				if (scaled[1] < viewport_bottom || scaled[1] > viewport_top) continue

				next.scaled.push(scaled)
				next.raw.push(point)
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
			
			for( let i = 0; i < points.length; i++) {
				const point = points[i]
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
