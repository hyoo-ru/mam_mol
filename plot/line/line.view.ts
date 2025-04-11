namespace $.$$ {
	export class $mol_plot_line extends $.$mol_plot_line {

		sub() {
			return this.hint() ? super.sub() : []
		}
		
		@ $mol_mem
		indexes() {
			
			const threshold = this.threshold()
			const {
				x: {min: viewport_left, max: viewport_right},
				y: {min: viewport_bottom, max: viewport_top},
			} = this.viewport()

			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const indexes = [] as number[]

			let last = new $mol_vector_2d( Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY )
			let last_zone = new $mol_vector_2d( 0, 0 )

			const series_x = this.series_x()
			const series_y = this.series_y()
			
			const zone_of = ( point: $mol_vector_2d<number> )=> new $mol_vector_2d(
				point.x < viewport_left ? -1
					: point.x > viewport_right ? 1
					: 0,
				point.y < viewport_bottom ? -1
					: point.y > viewport_top ? 1
					: 0,
			)
			
			for (let i = 0; i < series_x.length-1; i++) {
				
				const scaled = new $mol_vector_2d(
					Math.round( shift_x + this.repos_x( series_x[i] ) * scale_x ),
					Math.round( shift_y + this.repos_y( series_y[i] ) * scale_y ),
				)

				if (
					Math.abs( scaled.x - last.x ) < threshold
					&& Math.abs( scaled.y - last.y ) < threshold
				) continue

				if (scaled.x === last.x) {
					if (scaled.y > last.y) indexes[indexes.length - 1] = i
					last = scaled
					continue
				}

				if (scaled.y === last.y) {
					if (scaled.x > last.x) indexes[indexes.length - 1] = i
					last = scaled
					continue
				}

				const zone = zone_of( scaled )
				
				last = scaled
				
				if( zone.x !== 0 && zone.x === last_zone.x || zone.y !== 0 && zone.y === last_zone.y ) {
					continue
				}
				
				if( last_zone.x !== 0 || last_zone.y !== 0 ) {
					indexes.push( i - 1 )
				}
				
				last_zone = zone
				
				indexes.push(i)
				
			}
			
			indexes.push( series_x.length - 1 )

			return indexes
		}

		curve() {
			const points = this.points()
			if( points.length === 0 ) return ''

			return points.map( (point, index) => `${index === 0 ? 'M' : 'L'} ${point.join(' ')}`).join(' ')
		}
		
	}
}
