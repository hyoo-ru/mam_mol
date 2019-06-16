namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {

		viewport() {
			const size = this.size_real()
			return [[0, size[0]], [0, size[1]]] as const
		}

		@ $mol_mem
		series_x() {
			const series_y = this.series_y()
			const prev = $mol_atom_current()['value()']
			if (prev && prev.length === series_y.length) return prev

			return series_y.map((val, index) => index)
		}

		@ $mol_mem
		dimensions() {
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			] as [[number, number], [number,number]]
			
			const series_x = this.series_x()
			const series_y = this.series_y()
			for(let i = 0; i < series_x.length; i++) {
				const point_x = series_x[i]
				const point_y = series_y[i]
				if( point_x < next[0][0] ) next[0][0] = point_x
				if( point_y < next[0][1] ) next[0][1] = point_y
				if( point_x > next[1][0] ) next[1][0] = point_x
				if( point_y > next[1][1] ) next[1][1] = point_y
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
