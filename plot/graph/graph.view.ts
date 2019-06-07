namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		@ $mol_mem
		points_raw(): [number, number][] {
			const series = this.series()
			
			return Object.keys( series ).map( ( key , index )=> [
				isNaN( Number( key ) ) ? index : Number( key ) ,
				series[ key ] ,
			] )
		}

		@ $mol_mem
		points() {
			const threshold = this.threshold()
			const size = this.size_real()

			const threshold_left = - threshold
			const threshold_right = size[0] + threshold
			const threshold_top = size[1] + threshold
			const threshold_bottom = - threshold

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const points_raw = this.points_raw()
			const next = {
				raw: [] as (readonly [number, number])[],
				scaled: [] as (readonly [number, number])[]
			}
			let last = [ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] as const
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

				if (scaled[0] < threshold_left || scaled[0] > threshold_right) continue
				if (scaled[1] < threshold_bottom || scaled[1] > threshold_top) continue

				next.raw.push(point)
				next.scaled.push(scaled)
			}

			return next
		}
		
		@ $mol_mem
		dimensions() {
			const points = this.points_raw()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
			
			for( let point of points ) {
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
