class $mol_graph< Node , Edge > {
	
	nodes : { [ id : string ] : Node } = {}

	edgesOut : { [ from : string ] : { [ to : string ] : Edge } } = {}
	edgesIn : { [ to : string ] : { [ from : string ] : Edge } } = {}

	nodeEnsure( id : string ) {
		if( this.nodes.hasOwnProperty( id ) ) return
		this.nodes[ id ] = null
	}
	
	linkOut( from : string , to : string , edge : Edge ) {
		if( !this.edgesOut[ from ] ) {
			this.edgesOut[ from ] = {}
			this.nodeEnsure( from )
		}
		this.edgesOut[ from ][ to ] = edge
		this.nodeEnsure( to )
	}
	
	linkIn( to : string , from : string , edge : Edge ) {
		if( !this.edgesIn[ to ] ) {
			this.edgesIn[ to ] = {}
			this.nodeEnsure( to )
		}
		this.edgesIn[ to ][ from ] = edge
		this.nodeEnsure( from )
	}

	edgeOut( from , to ) {
		return this.edgesOut[ from ] && this.edgesOut[ from ][ to ]
	}

	edgeIn( to , from ) {
		return this.edgesIn[ to ] && this.edgesIn[ to ][ from ]
	}

	link( one : string , two : string , edge : Edge ) {
		this.linkOut( one , two , edge )
		this.linkIn( two , one , edge )
	}

	sorted( getWeight : ( edge : Edge )=> number  ) {
		var pending = Object.keys( this.nodes )
		var visited = []
		var weights = []
		var sorted = []
		
		var visit = ( id , weight )=> {
			
			var index = visited.lastIndexOf( id )
			if( index >= 0 ) {
				if( index === visited.length - 1 ) return
				if( weight <= weights[ index + 1 ] ) return
			}

			visited.push( id )
			weights.push( weight )

			var deps = this.edgesOut[ id ];
			for( var dep in deps ) {
				visit( dep , getWeight( deps[ dep ] ) )
			}
			
			if( sorted.indexOf( id ) === -1 ) sorted.push( id )
		}
		
		pending.forEach( id => visit( id , 0 ) )
		
		return sorted
	}

}

