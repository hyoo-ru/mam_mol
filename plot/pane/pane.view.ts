namespace $.$$ {

	export class $mol_plot_pane extends $.$mol_plot_pane {
		
		@ $mol_mem
		dimensions() {
			const graphs = this.graphs()
			let next = new $mol_vector_2d(
				$mol_vector_range_full.inversed,
				$mol_vector_range_full.inversed
			)

			for( let graph of graphs ) {
				next = next.expanded2(graph.dimensions() as [$mol_vector_range<number>, $mol_vector_range<number>])
			}
			
			return next
		}
		
		@ $mol_mem
		size() {
			const dims = this.dimensions()
			return [
				( dims.x.max - dims.x.min ) || 1 ,
				( dims.y.max - dims.y.min ) || 1 ,
			] as const
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
			return [ this.width() , this.height() ] as const
		}
		
		view_box() {
			const size = this.size_real()
			return `0 0 ${ size[0] } ${ size[1] }`
		}
		
		@ $mol_mem
		scale_limit() {
			const [ , right, , top, ] = super.scale_limit() as unknown as number[]
			// @todo replace above line to below, after https://github.com/eigenmethod/mol/pull/320
			// const [ [, right], [, top], ] = super.scale_limit()
			const size = this.size()
			const real = this.size_real()

			const left = + ( real[0] - this.gap_left() - this.gap_right() ) / size[0]
			const bottom = - ( real[1] - this.gap_top() - this.gap_bottom() ) / size[1]

			return new $mol_vector_2d(
				new $mol_vector_range(left, right),
				new $mol_vector_range(bottom, top),
			)
		}

		scale_default() {
			const limits = this.scale_limit()
			return [limits.x.min, limits.y.min] as const
		}

		@ $mol_mem
		scale(next?: readonly [number, number]) {
			if (next === undefined) next = this.scale_default()
			return new $mol_vector_2d( ...next ).limited(this.scale_limit())
		}

		@ $mol_mem
		shift_limit() {
			const [width, height] = this.dimensions()
			const [scale_x, scale_y] = this.scale()
			const [size_x, size_y] = this.size_real()

			const left = -width.min * scale_x + this.gap_left()
			const right = -width.max * scale_x + size_x - this.gap_right()

			const bottom = -height.min * scale_y + size_y - this.gap_bottom()
			const top = -height.max * scale_y + this.gap_top()

			return [[right, left], [bottom, top]] as const
		}

		@ $mol_mem
		shift_default() {
			const dims = this.dimensions()
			const scale = this.scale()
			return [
				Math.round( this.gap_left() - dims.x.min * scale[0] ) ,
				Math.round( this.gap_top() - dims.y.max * scale[1] ) ,
			] as const
		}

		shift_changed: boolean = false

		@ $mol_mem
		shift(next?: [number, number]) {
			if (next === undefined) {
				if (!this.shift_changed) return this.shift_default()
				next = $mol_atom_current()['value()'] || this.shift_default()
			}
			this.shift_changed = true

			return new $mol_vector_2d( ...next ).limited(this.shift_limit())
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
			return new $mol_vector_2d(
				new $mol_vector_range(this.gap_left(), size[0] - this.gap_right()),
				new $mol_vector_range(this.gap_bottom(), size[1] - this.gap_top()),
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
