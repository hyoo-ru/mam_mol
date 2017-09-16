namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
		
		dimensions() {
			const series = this.series()
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
			
			for( let key of Object.keys( series ) ) {
				if( series[key] < next[0][1] ) next[0][1] = series[key]
				if( series[key] > next[1][1] ) next[1][1] = series[key]
			}
			
			return next
		}
		
		@ $mol_mem
		step() {
			const dims = this.dimensions_expanded()
			const size = $mol_math_round_expand( ( dims[1][1] - dims[0][1] ) , -1 )
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( - size * this.scale()[1] / 24 ) / Math.log( 10 ) ) ) )
			const step = size / count
			return step
		}
		
		points_raw() {
			const dims = this.dimensions_expanded()
			const step = this.step()
			
			const next = [] as number[][]
			const start = Math.round( dims[0][1] / step ) * step
			const end = Math.round( dims[1][1] / step ) * step

			for( let val = start ; val <= end ; val += step ) {
				next.push( [ 0 , Number( val.toFixed( 10 ) ) ] )
			}

			return next
		}
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length - 1 ]
			
			return points.map( point => `M 0 ${ point[1] } H 2000 ` ).join( ' ' )
		}
		
		labels() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}
		
		label_pos_y( index : number ) {
			return this.points()[ index ][1] + 'px'
		}
		
		label_text( index : number ) {
			const step = this.step()
			const precision = Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
			return this.points_raw()[ index ][1].toFixed( precision )
		}
		
		back() {
			return [ this ]
		}
		
	}
}
