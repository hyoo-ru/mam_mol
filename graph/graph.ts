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
		
		link( from : string , to : string , edge : Edge ) {
			this.linkOut( from , to , edge )
			this.linkIn( to , from , edge )
		}
		
		unlink( from : string , to : string ) {
			delete this.edgesIn[ to ][ from ]
			delete this.edgesOut[ from ][ to ]
		}
		
		cut_cycles( get_weight : ( edge : Edge )=> number ) {
			
			const checked = [] as string[]
			
			for( const start in this.nodes ) {
				
				const path = [] as string[]
				
				const visit = ( from : string ) : number => {

					if( checked.includes( from ) ) return Number.POSITIVE_INFINITY

					const index = path.lastIndexOf( from )
					if( index > -1 ) {

						const cycle = path.slice( index )

						return cycle.reduce(
							( weight , id , index )=> Math.min(
								weight ,
								get_weight( this.edgesOut[ id ][ cycle[ ( index + 1 ) % cycle.length ] ] ) ,
							) ,
							Number.POSITIVE_INFINITY ,
						)

					}

					path.push( from )

					try {

						const deps = this.edgesOut[ from ]
						for( const to in deps ) {

							if( to === from ) {
								this.unlink( from , to )
								continue
							}

							const weight_out = get_weight( deps[ to ] )
							const min = visit( to )
							
							if( weight_out > min ) return min
							if( weight_out === min ) this.unlink( from , to )
							
						}

					} finally {
						path.pop()
					}

					checked.push( from )

					return Number.POSITIVE_INFINITY
				}

				visit( start )

			}

		}
		
		get sorted() {

			const sorted : string[] = []
			
			const visit = ( id : string ) => {
				
				if( sorted.indexOf( id ) !== -1 ) return

				for( const dep in this.edgesOut[ id ] ) visit( dep )

				if( sorted.indexOf( id ) !== -1 ) return

				sorted.push( id )

			}
			
			Object.keys( this.nodes ).forEach( id => visit( id ) )
			
			return sorted
		}
		
	}
	
}
