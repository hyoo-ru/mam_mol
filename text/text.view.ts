namespace $.$$ {
	export class $mol_text extends $.$mol_text {
		
		@ $mol_mem
		tokens() {
			return $mol_syntax_md_flow.tokenize( this.text() )
		}
		
		rows() {
			return this.tokens().map( ( token , index )=> {
				switch( token.name ) {
					case 'table' : return this.Table( index )
					case 'header' : return this.Header( index )
					case 'quote' : return this.Quote( index )
				}
				return this.Row( index )
			} )
		}
		
		header_level( index : number ) {
			return this.tokens()[ index ].chunks[0].length
		}
		
		header_content( index : number ) {
			return this.text2spans( `${ index }` , this.tokens()[ index ].chunks[2] )
		}
		
		quote_text( index : number ) {
			return this.tokens()[ index ].chunks[0].replace( /^> /mg , '' )
		}
		
		block_type( index : number ) {
			return this.tokens()[ index ].name
		}
		
		@ $mol_mem_key
		cell_contents( indexBlock : number ) {
			return this.tokens()[ indexBlock ].chunks[ 0 ]
			.split( /\r?\n/g )
			.filter( row => row && !/\|--/.test( row ) )
			.map( ( row , rowId ) => {
				return row.split( /\|/g )
				.filter( cell => cell )
				.map( ( cell , cellId )=> cell.trim() )
			} )
		}
		
		table_rows( blockId : number ) {
			return this.cell_contents( blockId )
			.slice( 1 )
			.map( ( row , rowId )=> this.Table_row({ block : blockId , row : rowId + 1 }) )
		}
		
		table_head_cells( blockId : number ) {
			return this.cell_contents( blockId )[ 0 ]
			.map( ( cell , cellId )=> this.Table_cell_head({ block : blockId , row : 0 , cell : cellId }) )
		}
		
		table_cells( id : { block : number , row : number } ) {
			return this.cell_contents( id.block )[ id.row ]
			.map( ( cell , cellId )=> this.Table_cell({ block : id.block , row : id.row , cell : cellId }) )
		}
		
		table_cell_content( id : { block : number , row : number , cell : number } ) {
			return this.text2spans( `${ id.block }/${ id.row }/${ id.cell }` , this.cell_contents( id.block )[ id.row ][ id.cell ] )
		}
		
		uri_base() {
			return $mol_dom_context.document.location.href
		}
		
		uri_resolve( uri : string ) {
			const url = new URL( uri , this.uri_base() )
			return url.toString()
		}
		
		text2spans( prefix : string , text : string ) {
			return $mol_syntax_md_line.tokenize( text ).map( ( token , index )=> {
				const id = `${prefix}/${index}`
				
				switch( token.name ) {
					case 'text-link' : {
						if( /^#|(\w+script+:)+/.test( token.chunks[ 1 ] ) ) {
							const span = this.Span( id )
							span.content( this.text2spans( id , token.chunks[ 0 ] ) )
							return span
						} else {
							const span = this.Link( id )
							span.type( token.name )
							span.link( this.uri_resolve( token.chunks[ 1 ] ) )
							span.content( this.text2spans( id , token.chunks[ 0 ] ) )
							return span
						}
					}
					case 'image-link' : {
						const span = this.Image( token.chunks[ 1 ] )
						span.type( token.name )
						span.link( this.uri_resolve( token.chunks[ 1 ] ) )
						span.title( token.chunks[ 0 ] )
						return span
					}
					case 'code3' :
					case 'code' : {
						const span = this.Span( id )
						span.type( 'code' )
						span.content( this.code2spans( id , token.chunks[ 0 ] ) )
						return span
					}
				}
				
				const span = this.Span( id )
				span.type( token.name )
				span.content(
					token.name
						? [].concat.apply( [] , token.chunks.map( ( text , index )=> this.text2spans( `${id}/${index}` , text ) ) )
						: [ token.found ]
				)
				return span
			} )
		}
		
		code2spans( prefix : string , text : string ) {
			return $mol_syntax_md_code.tokenize( text ).map( ( token , index )=> {
				const id = `${prefix}/${index}`
				
				const span = this.Span( id )
				span.type( token.name )
				
				switch( token.name ) {
					case 'code-docs' : {
						span.content( this.text2spans( `${id}/${index}` , token.found ) )
						return span
					}
					case 'code-string' : {
						span.content([ token.found[0] , ... this.code2spans( `${id}/${index}` , token.found.slice( 1 , token.found.length - 1 ) ) , token.found[ token.found.length - 1 ] ])
						return span
					}
					default : {
						span.content([ token.found ])
						return span
					}
				}
				
			} )
		}
		
		block_content( indexBlock : number ) : ($mol_view|string)[] {
			
			const token = this.tokens()[ indexBlock ]
			
			switch( token.name ) {
				case 'header' : return this.text2spans( `${ indexBlock }` , token.chunks[2] )
				case 'list' : return this.text2spans( `${ indexBlock }` , token.chunks[0] )
				case 'code' : return this.code2spans( `${ indexBlock }` , token.chunks[2].replace( /\t/g, '    ' ) )
				case 'code-indent' : return this.code2spans( `${ indexBlock }` , token.chunks[0].replace( /[\n\r]*$/ , '' ).replace( /\t/g, '    ' ) )
			}
			
			return this.text2spans( `${ indexBlock }` , token.chunks[0] )
		}
		
	}
}
