namespace $.$$ {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		labels_formatted() {
			return this.points().map( ( point , index )=> this.Label( index ) )
		}
		
		@ $mol_mem
		step() {
			const scale = this.scale_step()
			const [first, last] = this.dimensions_axle()
			const range = last - first
			const min_width = ( Math.abs( Math.log10( range ) ) + 2 ) * 15
			const size = $mol_math_round_expand( range , -1 )
			const count = Math.max( 1 , Math.pow( 10 , Math.floor( Math.log( size * scale / min_width ) / Math.log( 10 ) ) ) )
			let step = size / count
			const step_max = min_width * 2 / scale
			if( step > step_max ) step /= 2
			if( step > step_max ) step /= 2

			return step
		}

		box_width() {
			const win = this.$.$mol_dom_context
			const style = win.getComputedStyle(this.dom_node())
			return $mol_font_measure(Number(style['font-size'].replace(/[^\d]/ig, '')), style['font-family'], this.title() ) + 'px'
		}

		normalize(coord: number) {
			const [first, last] = this.viewport_axle()
			const scale = this.scale_axle()
			const shift = this.shift_axle()
			const step = this.step()

			const val = Math.round( coord / step ) * step

			if (scale == 0) return val

			const step_scaled = step * scale
			const scaled = val * scale + shift
			let count = 0
			if (scaled < first) count = (scaled - first) / step_scaled
			if (scaled > last) count = (scaled - last) / step_scaled

			return val - Math.floor(count) * step
		}

		viewport_dimensions() {
			const dims = this.dimensions_axle()
			return [
				this.normalize(dims[0]),
				this.normalize(dims[1]),
			]
		}

		@ $mol_mem
		points() {
			const [start, end] = this.viewport_dimensions()
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

		box_pos_y() {
			return `calc(${this.title_pos_y()} - 1.1rem)`
		}
		
		back() {
			return [ this ]
		}

		front() {
			return [] as $mol_plot_graph[]
		}
	}
}
