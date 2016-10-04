module $.$mol {
	export class $mol_texter extends $.$mol_texter {
		
		@ $mol_prop()
		tokensFlow() {
			return $mol_syntax_md_flow.tokenize( this.text() )
		}
		
		rows() {
			return this.tokensFlow().map( ( token , index )=> this.rower( index ) )
		}
		
		blockType( index : number ) {
			return this.tokensFlow()[ index ].name
		}
		
		blockContent( indexBlock : number ) {
			const text2spans = ( prefix : string , text : string )=> {
				return $mol_syntax_md_line.tokenize( text ).map( ( token , index )=> {
					const id = `${prefix}/${index}`
					
					switch( token.name ) {
						case 'text-link' : {
							const span = this.linker( id )
							span.type( token.name )
							span.link( token.chunks[ 1 ] )
							span.childs( text2spans( id , token.chunks[ 0 ] ) )
							return span
						}
						case 'image-link' : {
							const span = this.imager( id )
							span.type( token.name )
							span.link( token.chunks[ 1 ] )
							span.title( token.chunks[ 0 ] )
							return span
						}
						case 'code' : {
							const span = this.spanner( id )
							span.type( token.name )
							span.childs( token.chunks[ 0 ] )
							return span
						}
					}
					
					const span = this.spanner( id )
					span.type( token.name )
					span.childs(
						token.name
							? [].concat.apply( [] , token.chunks.map( ( text , index )=> text2spans( `${id}/${index}` , text ) ) )
							: [ token.found ]
					)
					return span
				} )
			}
			
			const token = this.tokensFlow()[ indexBlock ]
			
			switch( token.name ) {
				case 'header' : return text2spans( `${ indexBlock }` , token.chunks[2] )
				case 'list-item' : return text2spans( `${ indexBlock }` , token.chunks[1] )
				case 'code' : return [ token.chunks[2] ]
			}
			
			return text2spans( `${ indexBlock }` , token.chunks[0] )
		}
		
	}
}
