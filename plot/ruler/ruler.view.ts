namespace $.$$ {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		dimensions() {
			return [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
		}

		direction() {
			return 1
		}

		@ $mol_mem
		step() {
			const {from, to, scale} = this.range()

			const size = $mol_math_round_expand( to - from , -1 )

			const min_width = this.step_width()
			const direction = this.direction()
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( direction * size * scale / min_width ) / Math.log( 10 ) ) ) )
			let step = size / count
			const step_max = min_width * 2 / scale
			if( step > step_max ) step /= 2
			// if( step > step_max ) step /= 2

			return step
		}

		@ $mol_mem
		points_generated() {
			const {from, to, scale} = this.range()
			const shift = this.shift_axle()
			const step = this.step()

			const next = {raw: [] as number[], scaled: [] as number[]}
			const start = Math.round( from / step ) * step
			const end = Math.round( to / step ) * step

			for( let val = start ; val <= end ; val += step ) {
				const scaled = shift + val * scale
				next.scaled.push(scaled)
				next.raw.push(val)
			}

			return next
		}

		labels() {
			return this.points_generated().scaled.map( ( point , index )=> this.Label( index ) )
		}
		
		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		label_text( index : number ) {
			return this.points_generated().raw[ index ].toFixed( this.precision() )
		}
		
		back() {
			return [ this ]
		}
	}
}
