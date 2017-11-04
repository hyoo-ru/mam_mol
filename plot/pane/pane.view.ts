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
		shift() {
			const dims = this.dimensions_expanded()
			const scale = this.scale()
			return [
				Math.round( this.gap_left() - dims[0][0] * scale[0] ) ,
				Math.round( this.gap_top() - dims[1][1] * scale[1] ) ,
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
