namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		
		dimensions() {
			const series = this.series()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
			
			for( let key of Object.keys( series ) ) {
				const point_x = Number(key)
				if( point_x < next[0][0] ) next[0][0] = point_x
				if( point_x > next[1][0] ) next[1][0] = point_x
			}
			
			return next
		}

		@ $mol_mem
		step() {
			const dims = this.dimensions_expanded()
			const size = $mol_math_round_expand( ( dims[1][0] - dims[0][0] ) , -1 )
			const min_width = this.step_width()
			const [scale_x] = this.scale()
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( size * scale_x / min_width ) / Math.log( 10 ) ) ) )
			let step = size / count
			const step_max = min_width * 2 / scale_x
			if( step > step_max ) step /= 2
			if( step > step_max ) step /= 2

			return step
		}
		
		@ $mol_mem
		points_raw() {
			const dims = this.dimensions_expanded()
			const step = this.step()

			const next = [] as number[][]
			const start = Math.round( dims[0][0] / step ) * step
			const end = Math.round( dims[1][0] / step ) * step

			for( let val = start ; val <= end ; val += step ) {
				next.push( [ Number( val.toFixed( 10 ) ), 0 ] )
			}

			return next
		}
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length - 1 ]
			
			return points.map( point => `M ${ point[0] } 1000 V 0` ).join( ' ' )
		}
		
		labels() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}
		
		label_pos_x( index : number ) {
			return this.points()[ index ][0] + 'px'
		}
		
		label_text( index : number ) {
			const step = this.step()
			const precision = Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
			return this.points_raw()[ index ][0].toFixed( precision )
		}
		
		back() {
			return [ this ]
		}
		
	}
}
