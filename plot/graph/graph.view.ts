namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		viewport() {
			const size = this.size_real()
			return new this.$.$mol_vector_2d(
				new this.$.$mol_vector_range(0, size.x),
				new this.$.$mol_vector_range(0, size.y),
			)
		}

		points() {
			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const series_x = this.series_x()
			const series_y = this.series_y()

			return this.indexes().map(index => {
				const point_x = Math.round(shift_x + series_x[index] * scale_x)
				const point_y = Math.round(shift_y + series_y[index] * scale_y)

				return [point_x, point_y]
			}) as readonly( readonly number[] )[]
		}
		
		@ $mol_mem
		series_x() {
			return this.series_y().map((val, index) => index) as readonly number[]
		}

		@ $mol_mem
		dimensions() {
			let next = new this.$.$mol_vector_2d(
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
			return [ this ] as unknown as readonly $.$mol_svg[]
		}
		
	}
}
