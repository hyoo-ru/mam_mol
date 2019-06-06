namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {		
		@ $mol_mem
		step() {
			const dims = this.dimensions_expanded()
			const size = $mol_math_round_expand( ( dims[1][1] - dims[0][1] ) , -1 )
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( - size * this.scale()[1] / this.step_width() ) / Math.log( 10 ) ) ) )
			const step = size / count
			return step
		}
		
		@ $mol_mem
		points() {
			const [, shift_y] = this.shift()
			const [, scale_y] = this.scale()
			const dims = this.dimensions_expanded()
			const step = this.step()

			const next: [number[], number[]] = [[], []]
			const start = Math.round( dims[0][1] / step ) * step
			const end = Math.round( dims[1][1] / step ) * step

			for( let val = start ; val <= end ; val += step ) {
				const scaled = shift_y + val * scale_y
				next[0].push(scaled)
				next[1].push(val)
			}

			return next
		}
		
		curve() {
			return this.points()[0].map( point => `M 0 ${ point } H 2000` ).join( ' ' ) || ''
		}

		label_pos_x( index : number ) {
			return this.title_pos_x()
		}

		label_pos_y( index : number ) {
			return this.points()[0][ index ] + 'px'
		}
	}
}
