namespace $.$$ {
	
	export class $mol_plot_pane extends $.$mol_plot_pane {
		
		@ $mol_mem
		dimensions() {
			const graphs = this.graphs()
			
			const next = [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
			
			for( let graph of graphs ) {
				const dims = graph.dimensions()
				
				if( dims[ 0 ][ 0 ] < next[ 0 ][ 0 ] ) next[ 0 ][ 0 ] = dims[ 0 ][ 0 ]
				if( dims[ 0 ][ 1 ] < next[ 0 ][ 1 ] ) next[ 0 ][ 1 ] = dims[ 0 ][ 1 ]
				if( dims[ 1 ][ 0 ] > next[ 1 ][ 0 ] ) next[ 1 ][ 0 ] = dims[ 1 ][ 0 ]
				if( dims[ 1 ][ 1 ] > next[ 1 ][ 1 ] ) next[ 1 ][ 1 ] = dims[ 1 ][ 1 ]
			}
			
			return next
		}
		
		@ $mol_mem
		size() {
			const dims = this.dimensions()
			return [
				( dims[1][0] - dims[0][0] ) || 1 ,
				( dims[1][1] - dims[0][1] ) || 1 ,
			]
		}
		
		@ $mol_mem
		dimensions_expanded() {
			const dims = this.dimensions()
			const size = this.size()
			const gap = [ 0 , 0 ]
			return [
				[ dims[0][0] - size[0] * gap[0] , dims[0][1] - size[1] * gap[1] ] ,
				[ dims[1][0] + size[0] * gap[0] , dims[1][1] + size[1] * gap[1] ] ,
			]
		}
		
		@ $mol_mem
		size_expaned() {
			const dims = this.dimensions_expanded()
			return [
				( dims[1][0] - dims[0][0] ) || 1 ,
				( dims[1][1] - dims[0][1] ) || 1 ,
			]
		}
		
		graph_hue( index : number ) {
			return ( 360 + ( this.hue_base() + this.hue_shift() * index ) % 360 ) % 360
		}
		
		@ $mol_mem
		graphs_colored() {
			const graphs = this.graphs_positioned()
			
			graphs.forEach( ( graph , index ) => {
				graph.hue = () => this.graph_hue( index )
			} )
			
			return graphs
		}
		
		size_real() {
			return [ this.width() , this.height() ]
		}
		
		view_box() {
			const size = this.size_real()
			return `0 0 ${ size[0] } ${ size[1] }`
		}
		
		@ $mol_mem
		scale() {
			const size = this.size_expaned()
			const real = this.size_real()
			return [
				+ ( real[0] - this.gap_left() - this.gap_right() ) / size[0] ,
				- ( real[1] - this.gap_top() - this.gap_bottom() ) / size[1] ,
			]
		}

		@ $mol_mem
		shift_defaults(): [number, number] {
			const dims = this.dimensions_expanded()
			const scale = this.scale()
			return [
				Math.round( this.gap_left() - dims[0][0] * scale[0] ) ,
				Math.round( this.gap_top() - dims[1][1] * scale[1] ) ,
			]
		}

		@ $mol_mem
		shift(next?: [number, number]) {
			if (next === undefined) next = $mol_atom_current()['value()'] || this.shift_defaults()

			const [min, max] = this.dimensions_expanded()
			const [scale_x, scale_y] = this.scale()
			const [size_x, size_y] = this.size_real()

			const left = -max[0] * scale_x + size_x - this.gap_left()
			const right = -min[0] * scale_x + this.gap_right()

			let shift_x = next[0]
			if (shift_x > right) shift_x = right
			if (shift_x < left) shift_x = left

			const bottom = -min[1] * scale_y + size_y - this.gap_bottom()
			const top = -max[1] * scale_y + this.gap_top()

			let shift_y = next[1]
			if (shift_y > top) shift_y = top
			if (shift_y < bottom) shift_y = bottom

			return [
				Math.round(shift_x),
				Math.round(shift_y),
			]
		}
		
		@ $mol_mem
		graphs_positioned() {
			const graphs = this.graphs()
			
			graphs.forEach( ( graph , index ) => {
				graph.shift = ()=> this.shift()
				graph.scale = ()=> this.scale()
				graph.dimensions_expanded = ()=> this.dimensions_expanded()
				graph.size_real = ()=> this.size_real()
			} )
			
			return graphs
		}
		
		@ $mol_mem
		graphs_sorted() {
			const graphs = this.graphs_colored()
			const sorted = [] as $mol_view[]
			
			for( let graph of graphs ) sorted.push( ...graph.back() )
			for( let graph of graphs ) sorted.push( ...graph.front() )
			
			return sorted
		}
		
	}

}
