namespace $ {
	
	export class $mol_graph< Node , Edge > {
		
		nodes : { [ id : string ] : Node | undefined } = {}
		
		edgesOut : { [ from : string ] : { [ to : string ] : Edge } } = {}
		edgesIn : { [ to : string ] : { [ from : string ] : Edge } } = {}
		
		nodeEnsure( id : string ) {
			if( this.nodes.hasOwnProperty( id ) ) return
			this.nodes[ id ] = undefined
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

			const pending = Object.keys( this.nodes )
			const visited : string[] = []
			const weights : number[] = []
			const sorted : string[] = []
			
			const visit = ( id : string , weight_in : number ) : number => {
				
				if( sorted.indexOf( id ) !== -1 ) return Number.POSITIVE_INFINITY

				const index = visited.lastIndexOf( id )
				if( index >= 0 ) return weights.slice( index + 1 ).reduce( ( a , b )=> Math.min( a , b ) )
				
				visited.push( id )
				weights.push( weight_in )

				try {
				
					const deps = this.edgesOut[ id ];
					for( const dep in deps ) {					
						if( dep === id ) continue
					
						const weight_out = getWeight( deps[ dep ] )
						const min = visit( dep , weight_out )

						if( weight_out > min ) return min
					}

				} finally {
				
					visited.pop()
					weights.pop()
					
				}

				if( sorted.indexOf( id ) !== -1 ) return Number.POSITIVE_INFINITY

				sorted.push( id )

				return Number.POSITIVE_INFINITY
			}
			
			pending.forEach( id => visit( id , Number.POSITIVE_INFINITY ) )
			
			return sorted
		}
		
	}
	
}
