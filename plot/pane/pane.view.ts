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
			const [ , right, , top, ] = super.scale_limit() as unknown as number[]
			// @todo replace above line to below, after https://github.com/eigenmethod/mol/pull/320
			// const [ [, right], [, top], ] = super.scale_limit()
			const size = this.size()
			const real = this.size_real()

			const left = + ( real.x - this.gap_left() - this.gap_right() ) / size.x
			const bottom = - ( real.y - this.gap_top() - this.gap_bottom()) / size.y

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
		scale(next?: readonly [number, number]) {
			if (next === undefined) next = this.scale_default()
			return new this.$.$mol_vector_2d( ...next ).limited(this.scale_limit())
		}

		scale_x(next?: number): number {
			return this.scale(next && [next, this.scale()[1]])[0]
		}

		scale_y(next?: number): number {
			return this.scale(next && [this.scale()[0], next])[1]
		}

		@ $mol_mem
		shift_limit() {
			const dims = this.dimensions()
			const [scale_x, scale_y] = this.scale()
			const size = this.size_real()

			const left = this.gap_left() - dims.x.min * scale_x
			const right = size.x - this.gap_right() - dims.x.max * scale_x

			const top = this.gap_top() - dims.y.max * scale_y
			const bottom = size.y - this.gap_bottom() - dims.y.min * scale_y

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

		shift_changed: boolean = false

		@ $mol_mem
		shift(next?: readonly [number, number]) {
			if (next === undefined) {
				if (!this.shift_changed) return this.shift_default()
				next = $mol_atom_current()['value()'] || this.shift_default()
			}
			this.shift_changed = true

			return new this.$.$mol_vector_2d( ...next ).limited(this.shift_limit())
		}

		reset_event(event?: Event) {
			if (event) event.preventDefault()
			this.scale(this.scale_default())
			this.shift(this.shift_default())
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
			const sorted = [] as $mol_plot_graph[]
			
			for( let graph of graphs ) sorted.push( ...graph.back() as $mol_plot_graph[])
			for( let graph of graphs ) sorted.push( ...graph.front() as $mol_plot_graph[])
			
			return sorted
		}
	}

}
