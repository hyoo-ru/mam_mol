namespace $ {
	
	/**
	 * # Generic Graph model
	 * - Supports any type of Nodes and Edges.
	 * - All links are ordered, but this may be ignored.
	 * - Multigraph supported using arrays of Edges.
	 * - Hypergraph supported by reusing same Edge on set of links.
	 * - Ubergraph supported using Edges as Nodes to.
	 **/
	export class $mol_graph< Node , Edge > {
		
		/** All registered Nodes */
		nodes = new Set< Node >()
		
		/** Edges for Nodes pairs (from-to-edge) */
		edges_out = new Map< Node , Map< Node , Edge > >()
		/** Edges for Nodes pairs (to-from-edge) */
		edges_in = new Map< Node , Map< Node , Edge > >()
		
		// LINKING NODES
		
		/** Full connect two Nodes */
		link( from : Node , to : Node , edge : Edge ) {
			this.link_out( from , to , edge )
			this.link_in( to , from , edge )
		}
		
		/** Full disconnect two Nodes */
		unlink( from : Node , to : Node ) {
			this.edges_in.get( to )?.delete( from )
			this.edges_out.get( from )?.delete( to )
		}
		
		/** Forward connect two Nodes */
		link_out( from : Node , to : Node , edge : Edge ) {
			
			let pair = this.edges_out.get( from )
			
			if( !pair ) {
				pair = new Map< Node , Edge >()
				this.edges_out.set( from , pair )
				this.nodes.add( from )
			}
			
			pair.set( to , edge )
			this.nodes.add( to )

		}
		
		/** Backward connect two Nodes */
		link_in( to : Node , from : Node , edge : Edge ) {

			let pair = this.edges_in.get( to )
			
			if( !pair ) {
				pair = new Map< Node , Edge >()
				this.edges_in.set( to , pair )
				this.nodes.add( to )
			}
			
			pair.set( from , edge )
			this.nodes.add( to )

		}
		
		// GETTING EDGES
		
		/** Return any Edge for two Nodes or null */
		edge( from : Node , to : Node ) {
			return this.edge_out( from, to ) ?? this.edge_in( to, from )
		}
		
		/** Return output Edge for two Nodes or null */
		edge_out( from : Node , to : Node ) {
			return this.edges_out.get( from )?.get( to ) ?? null
		}
		
		/** Return input Edge for two Nodes or null */
		edge_in( to : Node , from : Node ) {
			return this.edges_in.get( to )?.get( from ) ?? null
		}
		
		// MUTATIONS
		
		/** Cut cycles at lowest priority of Edges */
		acyclic( get_weight : ( edge : Edge )=> number ) {
			
			const checked = [] as Node[]
			
			for( const start of this.nodes ) {
				
				const path = [] as Node[]
				
				const visit = ( from : Node ) : number => {

					if( checked.includes( from ) ) return Number.MAX_SAFE_INTEGER

					const index = path.lastIndexOf( from )
					if( index > -1 ) {

						const cycle = path.slice( index )

						return cycle.reduce(
							( weight , node , index )=> Math.min(
								weight ,
								get_weight( this.edge_out( node , cycle[ ( index + 1 ) % cycle.length ] )! ) ,
							) ,
							Number.MAX_SAFE_INTEGER ,
						)

					}

					path.push( from )

					dive: try {

						const deps = this.edges_out.get( from )
						if( !deps ) break dive

						for( const [ to , edge ] of deps ) {

							if( to === from ) {
								this.unlink( from , to )
								continue
							}

							const weight_out = get_weight( edge )
							const min = visit( to )
							
							if( weight_out > min ) return min
							if( weight_out === min ) {
								
								this.unlink( from , to )
								
								if( path.length > 1 ) {
									const enter = path[ path.length - 2 ]
									this.link( enter , to , edge )
								}
								
							}
							
						}

					} finally {
						path.pop()
					}

					checked.push( from )

					return Number.MAX_SAFE_INTEGER
				}

				visit( start )

			}

		}
		
		// NODES SELECTION
		
		/** Topoligical ordered set of all Nodes for acyclic graph */
		get sorted() {

			const sorted = new Set< Node >()
			
			const visit = ( node : Node ) => {
				
				if( sorted.has( node ) ) return

				const deps = this.edges_out.get( node )

				if( deps ) {
					for( const [dep] of deps ) visit( dep )
				}

				sorted.add( node )
			}
			
			for( const node of this.nodes ) {
				visit( node )
			}
			
			return sorted
		}
		
		/** All Nodes which don't have input Edges */
		get roots() {
			
			const roots = [] as Node[]
			for( const node of this.nodes ) {
				
				if( this.edges_in.get( node )?.size ) continue
				roots.push( node )
				
			}
			
			return roots
		}
		
		// DEPTH STATS
		
		/**
		 * Nodes depth statistics for acyclic graph
		 * @example
		 * graph.depth_stat( Math.min )
		 * graph.depth_stat( Math.max )
		 **/
		nodes_depth( select: ( left: number, right: number )=> number ) {
			
			const stat = new Map< Node, number >()
			const visit = ( node: Node, depth = 0 )=> {
				
				if( stat.has( node ) ) stat.set( node, select( depth, stat.get( node )! ) )
				else stat.set( node, depth )
				
				for( const kid of this.edges_out.get( node )?.keys() ?? [] ) visit( kid, depth + 1 )
				
			}
			for( const root of this.roots ) visit( root )
			
			return stat
		}
		
		/**
		 * Depth's Nodes statistics for acyclic graph
		 * @example
		 * graph.depth_nodes( Math.min )
		 * graph.depth_nodes( Math.max )
		 **/
		depth_nodes( select: ( left: number, right: number )=> number ) {
			
			const groups = [] as Node[][]
			for( const [ node, depth ] of this.nodes_depth( select ).entries() ) {
				
				if( groups[ depth ] ) groups[ depth ].push( node )
				else groups[ depth ] = [ node ]
				
			}
			
			return groups
		}
		
	}
	
}
