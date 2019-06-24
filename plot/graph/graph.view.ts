namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		dimensions_pane: () => $mol_vector_2d<$mol_vector_range<number>>

		viewport() {
			const size = this.size_real()
			return new $mol_vector_2d(
				new $mol_vector_range(0, size[0]),
				new $mol_vector_range(0, size[1]),
			)
		}

		@ $mol_mem
		series_x() {
			return this.series_y().map((val, index) => index)
		}

		@ $mol_mem
		dimensions() {
			let next = new $mol_vector_2d(
				$mol_vector_range_full.inversed,
				$mol_vector_range_full.inversed
			)

			const series_x = this.series_x()
			const series_y = this.series_y()
			for(let i = 0; i < series_x.length; i++) {
				next = next.expanded1([series_x[i], series_y[i]] as const)
			}
			
			return next
		}
		
		color() {
			const hue = this.hue()
			return hue ? `hsl( ${ hue } , 100% , 35% )` : ''
		}
		
		front() {
			return [ this ]
		}
		
	}
}
