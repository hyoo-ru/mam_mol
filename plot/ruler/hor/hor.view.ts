namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		dimensions() {
			return [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
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
		points() {
			const [shift_x] = this.shift()
			const [scale_x] = this.scale()
			const dims = this.dimensions_expanded()
			const step = this.step()

			const next: [number[], number[]] = [[], []]
			const start = Math.round( dims[0][0] / step ) * step
			const end = Math.round( dims[1][0] / step ) * step

			for( let val = start ; val <= end ; val += step ) {
				const scaled = shift_x + val * scale_x
				next[0].push(scaled)
				next[1].push(val)
			}

			return next
		}
		
		curve() {
			return this.points()[0].map( point => `M ${ point } 1000 V 0` ).join( ' ' ) || ''
		}
		
		labels() {
			return this.points()[0].map( ( point , index )=> this.Label( index ) )
		}
		
		label_pos_x( index : number ) {
			return this.points()[0][ index ] + 'px'
		}

		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		label_text( index : number ) {
			return this.points()[1][ index ].toFixed( this.precision() )
		}
		
		back() {
			return [ this ]
		}
		
	}
}
