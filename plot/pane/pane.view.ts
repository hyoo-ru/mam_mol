namespace $.$$ {

	export class $mol_plot_pane extends $.$mol_plot_pane {
		
		@ $mol_mem
		dimensions() {
			const graphs = this.graphs()
			let next = new this.$.$mol_vector_2d(
				$mol_vector_range_full.inversed,
				$mol_vector_range_full.inversed
			)

			for( let graph of graphs ) {
				next = next.expanded2(graph.dimensions())
			}
			
			return next
		}
		
		@ $mol_mem
		size() {
			const dims = this.dimensions()
			return new this.$.$mol_vector_2d(
				( dims.x.max - dims.x.min ) || 1 ,
				( dims.y.max - dims.y.min ) || 1 ,
			)
		}
			
		graph_hue( index : number ) {
			return ( 360 + ( this.hue_base() + this.hue_shift() * index ) % 360 ) % 360
		}
		
		@ $mol_mem
		graphs_colored() {
			const graphs = this.graphs_positioned()
			for (let index = 0; index < graphs.length; index++) {
				graphs[index].hue = () => this.graph_hue( index )
			}
			
			return graphs
		}
		
		size_real() {
			return new this.$.$mol_vector_2d(this.width() , this.height())
		}

		view_box() {
			const size = this.size_real()
			return `0 0 ${ size.x } ${ size.y }`
		}
		
		@ $mol_mem
		scale_limit() {
			const {
				x: {max: right},
				y: {max: top}
			} = super.scale_limit()
			const gap = this.gap()
			const size = this.size()
			const real = this.size_real()

			const left = + ( real.x - gap.x.min - gap.x.max ) / size.x
			const bottom = - ( real.y - gap.y.max - gap.y.min) / size.y

			return new this.$.$mol_vector_2d(
				new this.$.$mol_vector_range(left, right),
				new this.$.$mol_vector_range(bottom, top),
			)
		}

		scale_default() {
			const limits = this.scale_limit()
			return [limits.x.min, limits.y.min] as const
		}

		@ $mol_mem
		scale(next?: readonly [number, number], force?: $mol_mem_force) : readonly [number, number] {
			if (next === undefined) {
				if (!this.graph_touched) return this.scale_default()
				next = $mol_mem_cached( ()=> this.scale() ) || this.scale_default()
			}
			this.graph_touched = true

			return new this.$.$mol_vector_2d( ...next ).limited(this.scale_limit())
		}

		scale_x(next?: number): number {
			return this.scale( next === undefined ? undefined : [ next , this.scale()[1] ] )[0]
		}

		scale_y(next?: number): number {
			return this.scale( next === undefined ? undefined : [ this.scale()[0] , next ] )[1]
		}

		@ $mol_mem
		shift_limit() {
			const dims = this.dimensions()
			const [scale_x, scale_y] = this.scale()
			const size = this.size_real()
			const gap = this.gap()

			const left = gap.x.min - dims.x.min * scale_x
			const right = size.x - gap.x.max - dims.x.max * scale_x

			const top = gap.y.max - dims.y.max * scale_y
			const bottom = size.y - gap.y.min - dims.y.min * scale_y

			return new this.$.$mol_vector_2d(
				new this.$.$mol_vector_range(right, left),
				new this.$.$mol_vector_range(bottom, top),
			)
		}

		@ $mol_mem
		shift_default() {
			const limits = this.shift_limit()
			return [limits.x.min, limits.y.min] as const
		}

		graph_touched: boolean = false

		@ $mol_mem
		shift(next?: readonly [number, number], force?: $mol_mem_force) : readonly [number, number]{

			if (next === undefined) {
				if (!this.graph_touched) return this.shift_default()
				next = $mol_mem_cached( ()=> this.shift() ) || this.shift_default()
			}

			this.graph_touched = true

			return new this.$.$mol_vector_2d( ...next! ).limited(this.shift_limit())
		}

		reset(event?: Event) {
			this.graph_touched = false
			this.scale(this.scale_default(), $mol_mem_force_cache)
			this.shift(this.shift_default(), $mol_mem_force_cache)
		}

		@ $mol_mem
		graphs_positioned() {
			const graphs = this.graphs()
			for (let graph of graphs) {
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.dimensions_pane = () => this.dimensions()
				graph.viewport = () => this.viewport()
				graph.size_real = ()=> this.size_real()
				graph.cursor_position = ()=> this.cursor_position()
				graph.gap = () => this.gap()
			}
			
			return graphs
		}

		@ $mol_mem
		viewport() {
			const size = this.size_real()
			return new this.$.$mol_vector_2d(
				new this.$.$mol_vector_range(0, size.x),
				new this.$.$mol_vector_range(0, size.y),
			)
		}

		@ $mol_mem
		graphs_sorted() {
			const graphs = this.graphs_colored()
			const sorted = [] as $.$mol_svg[]
			
			for( let graph of graphs ) sorted.push(...graph.back())
			for( let graph of graphs ) sorted.push(...graph.front())
			
			return sorted
		}
	}

}
