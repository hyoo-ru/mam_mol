namespace $ {
	
	export class $mol_graph< Node , Edge > {
		
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
		
		edgeOut( from : string , to : string ) {
			return this.edgesOut[ from ] && this.edgesOut[ from ][ to ]
		}
		
		edgeIn( to : string , from : string ) {
			return this.edgesIn[ to ] && this.edgesIn[ to ][ from ]
		}
		
		link( one : string , two : string , edge : Edge ) {
			this.linkOut( one , two , edge )
			this.linkIn( two , one , edge )
		}
		
		sorted( getWeight : ( edge : Edge )=> number ) {
			var pending = Object.keys( this.nodes )
			var visited : string[] = []
			var weights : number[] = []
			var sorted : string[] = []
			
			var visit = ( id : string , weight : number )=> {
				
				var index = visited.lastIndexOf( id )
				if( index >= 0 ) {
					if( index === visited.length - 1 ) return false
					if( weight <= weights[ index + 1 ] ) return false
				}
				
				if( weight != null ) {
					visited.push( id )
					weights.push( weight )
				}
				
				var deps = this.edgesOut[ id ];
				for( var dep in deps ) {
					if( dep === id ) continue
					visit( dep , getWeight( deps[ dep ] ) )
				}
				
				if( sorted.indexOf( id ) !== -1 ) return false
				
				sorted.push( id )
				
				return true
			}
			
			pending.forEach( id => visit( id , null ) )
			
			return sorted
		}
		
	}
	
}
