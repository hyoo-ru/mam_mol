namespace $.$$ {

	/**
	 * Fastest plot lib for vector graphics.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
	 */
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
			const graphs = this.graphs_visible()
			for (let index = 0; index < graphs.length; index++) {
				graphs[index].hue( this.graph_hue( index ) )
			}

			return graphs
		}
		
		size_real() {
			const rect = this.view_rect()
			if( !rect ) return new this.$.$mol_vector_2d( 1, 1 )
			return new this.$.$mol_vector_2d( rect.width, rect.height )
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
				new this.$.$mol_vector_range(top, bottom),
			)
		}

		scale_default() {
			const limits = this.scale_limit()
			return new $mol_vector_2d( limits.x.min, limits.y.max )
		}

		@ $mol_mem
		scale(next?: $mol_vector_2d< number >): $mol_vector_2d< number > {
			if (next === undefined) {
				if (!this.graph_touched) return this.scale_default()
				next = $mol_mem_cached( ()=> this.scale() ) ?? this.scale_default()
			}
			this.graph_touched = true

			return next!.limited(this.scale_limit())
		}

		scale_x(next?: number): number {
			return this.scale(
				next === undefined
					? undefined
					: new $mol_vector_2d( next , this.scale().y )
			).x
		}

		scale_y(next?: number): number {
			return this.scale(
				next === undefined
					? undefined
					: new $mol_vector_2d( this.scale().x , next )
			).y
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
			return new $mol_vector_2d( limits.x.min, limits.y.min )
		}

		graph_touched: boolean = false

		@ $mol_mem
		shift(next?: $mol_vector_2d< number >): $mol_vector_2d< number > {

			if (next === undefined) {
				if (!this.graph_touched) return this.shift_default()
				next = $mol_mem_cached( ()=> this.shift() ) ?? this.shift_default()
			}

			this.graph_touched = true

			return next!.limited(this.shift_limit())
		}

		reset(event?: Event) {
			this.graph_touched = false
			this.scale(this.scale_default())
			this.shift(this.shift_default())
		}

		@ $mol_mem
		graphs_visible() {
			
			const viewport = this.dimensions_viewport()
			const size_real = this.size_real()
			
			const max_x = ( viewport.x.max - viewport.x.min ) / size_real.x
			const max_y = ( viewport.y.max - viewport.y.min ) / size_real.y
			
			return this.graphs_positioned().filter( graph => {
				
				const dims = graph.dimensions()
				
				if( dims.x.min > dims.x.max ) return true
				if( dims.y.min > dims.y.max ) return true
				
				const size_x = dims.x.max - dims.x.min
				const size_y = dims.y.max - dims.y.min
				if( ( size_x || size_y ) && size_x < max_x && size_y < max_y ) return false
				
				if( dims.x.min > viewport.x.max ) return false
				if( dims.x.max < viewport.x.min ) return false
				
				if( dims.y.min > viewport.y.max ) return false
				if( dims.y.max < viewport.y.min ) return false
				
				return true
			} )
			
		}
		
		@ $mol_mem
		graphs_positioned() {
			const graphs = this.graphs()
			for (let graph of graphs) {
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.dimensions_pane = () => this.dimensions_viewport()
				graph.viewport = () => this.viewport()
				graph.size_real = ()=> this.size_real()
				graph.cursor_position = ()=> this.cursor_position()
				graph.gap = () => this.gap()
			}
			
			return graphs
		}
		
		@ $mol_mem
		dimensions_viewport() {
			const shift = this.shift().multed0(-1)
			const scale = this.scale().powered0(-1)
			return this.viewport().map( ( range, i )=> range.added0( shift[i] ).multed0( scale[i] ).sort( (a,b)=>a-b) )
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
