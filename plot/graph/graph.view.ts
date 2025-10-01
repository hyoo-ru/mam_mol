namespace $.$$ {
	export class $mol_plot_graph extends $.$mol_plot_graph {
		
		viewport() {
			const size = this.size_real()
			return new this.$.$mol_vector_2d(
				new this.$.$mol_vector_range(0, size.x),
				new this.$.$mol_vector_range(0, size.y),
			)
		}
		
		@ $mol_mem
		indexes() {
			return this.series_x().map( (_,i)=> i ) as readonly number[]
		}
		
		repos_x( val: number ) {
			return val
		}

		repos_y( val: number ) {
			return val
		}

		points() {
			const [shift_x, shift_y] = this.shift()
			const [scale_x, scale_y] = this.scale()
			const series_x = this.series_x()
			const series_y = this.series_y()

			return this.indexes().map(index => {
				
				let point_x = Math.round(shift_x + this.repos_x( series_x[index] ) * scale_x)
				let point_y = Math.round(shift_y + this.repos_y( series_y[index] ) * scale_y)

				point_x = Math.max( Number.MIN_SAFE_INTEGER, Math.min( point_x, Number.MAX_SAFE_INTEGER ) )
				point_y = Math.max( Number.MIN_SAFE_INTEGER, Math.min( point_y, Number.MAX_SAFE_INTEGER ) )

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
				if( series_x[i] > next.x.max ) next.x.max = this.repos_x( series_x[i] )
				if( series_x[i] < next.x.min ) next.x.min = this.repos_x( series_x[i] )
				if( series_y[i] > next.y.max ) next.y.max = this.repos_y( series_y[i] )
				if( series_y[i] < next.y.min ) next.y.min = this.repos_y( series_y[i] )
			}

			return next
		}
		
		color() {
			const hue = this.hue()
			if( !hue ) return ''
			const lightness = this.focused() ? 50 : 35
			return `hsl( ${ hue } , 100% , ${ lightness }% )`
		}
		
		front() {
			return [ this ] as unknown as readonly $.$mol_svg[]
		}
		
	}
}
