namespace $.$$ {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		labels_formatted() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}

		@ $mol_mem
		step() {
			const scale = this.scale_step()
			const dims = this.dimensions_axis()
			const range = dims.max - dims.min
			const min_width = ( Math.abs( Math.log10( range ) ) + 2 ) * 15
			const size = $mol_math_round_expand( range , -1 )
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( size * scale / min_width ) / Math.log( 10 ) ) ) )
			let step = size / count
			const step_max = min_width * 2 / scale
			if( step > step_max ) step /= 2
			if( step > step_max ) step /= 2

			return step
		}

		snap_to_grid(coord: number) {
			const viewport = this.viewport_axis()
			const scale = this.scale_axis()
			const shift = this.shift_axis()
			const step = this.step()

			const val = Math.round( coord / step ) * step

			if (scale == 0) return val

			const step_scaled = step * scale
			const scaled = val * scale + shift
			let count = 0
			if (scaled < viewport.min) count = (scaled - viewport.min) / step_scaled
			if (scaled > viewport.max) count = (scaled - viewport.max) / step_scaled

			return val - Math.floor(count) * step
		}

		@ $mol_mem
		points() {
			const dims = this.dimensions_axis()
			const start = this.snap_to_grid(dims.min)
			const end = this.snap_to_grid(dims.max)
			const step = this.step()

			const next = [] as number[]
			for( let val = start ; val <= end ; val += step ) {
				next.push(val)
			}

			return next
		}

		@$mol_mem
		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		label_text( index : number ) {
			const point = this.points()[index]
			return point.toFixed( this.precision() )
		}

		back() {
			return [this.Curve()]
		}

		front() {
			return [...this.labels_formatted(), this.Title()]
		}
	}
}
