namespace $.$$ {
	
	export class $mol_chart_legend extends $.$mol_chart_legend {
		
		@ $mol_mem
		graphs_front() {
			return this.graphs().filter( graph => graph.Sample() )
		}
		
		graph_legends() {
			return this.graphs_front().map( ( graph , index )=> this.Graph_legend( index ) )
		}
		
		graph_title( index : number ) {
			return this.graphs_front()[ index ].title()
		}
		
		Graph_sample( index : number ) {
			return this.graphs_front()[ index ].Sample()
		}
		
	}
	
}
