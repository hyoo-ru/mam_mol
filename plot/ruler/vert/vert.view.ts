namespace $.$mol {
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
		
		@ $mol_mem()
		step() {
			const dims = this.dimensions()
			const count = Math.max( 1 , Math.pow( 2 , Math.floor( Math.log( ( dims[0][1] - dims[1][1] ) * this.scale()[1] / 48 ) / Math.log( 2 ) - 1 ) ) )
			const step = $mol_math_round_expand( ( dims[1][1] - dims[0][1] ) ) / count
			return step
		}
		
		points_raw() {
			const dims = this.dimensions()
			const step = this.step()
			
			const next = [] as number[][]
			const start = Math.ceil( dims[0][1] / step ) * step
			const end = Math.floor( dims[1][1] / step + 1 ) * step

			for( let val = start ; val <= end ; val += step ) {
				next.push( [ 0 , val ] )
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
		
		label_pos( index : number ) {
			return [ '48px' , this.points()[ index ][1] ]
		}
		
		label_text( index : number ) {
			const step = this.step()
			const precision = Math.max( 0 , ( step - Math.floor( step ) ).toString().length - 2 )
			return this.points_raw()[ index ][1].toFixed( precision )
		}
		
	}
}
