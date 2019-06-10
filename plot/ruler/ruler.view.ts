namespace $.$$ {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		labels() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}
		
		@ $mol_mem
		step() {
			const scale = this.step_scale()
			const viewport = this.axle_viewport()

			const min_width = this.step_width()
			const size = $mol_math_round_expand( viewport[1] - viewport[0] , -1 )
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( size * scale / min_width ) / Math.log( 10 ) ) ) )
			let step = size / count
			const step_max = min_width * 2 / scale
			if( step > step_max ) step /= 2
			if( step > step_max ) step /= 2

			return step
		}

		@ $mol_mem
		points() {
			const viewport = this.axle_viewport()
			const step = this.step()

			const next = [] as number[]
			const start = this.normalize(Math.round( viewport[0] / step ) * step)
			const end = this.normalize(Math.round( viewport[1] / step ) * step)

			for( let val = start ; val <= end ; val += step ) {
				next.push(val)
			}

			return next
		}

		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		label_text( index : number ) {
			const point = this.points()[index]
			return point.toFixed( this.precision() )
		}
		
		front() {
			return [ this ]
		}
	}
}
