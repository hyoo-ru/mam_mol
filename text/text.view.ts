namespace $.$$ {
	export class $mol_text extends $.$mol_text {
		
		@ $mol_mem
		tokens() {
			const tokens = [] as { name : string , found : string , chunks: string[] }[]
			this.$.$mol_syntax2_md_flow.tokenize(
				this.text(),
				( name , found , chunks )=> tokens.push({ name , found , chunks }),
			)
			return tokens as Readonly< typeof tokens >
		}
		
		@ $mol_mem
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
		
		@ $mol_mem_key
		table_rows( blockId : number ) {
			return this.cell_contents( blockId )
			.slice( 1 )
			.map( ( row , rowId )=> this.Table_row({ block : blockId , row : rowId + 1 }) )
		}
		
		@ $mol_mem_key
		table_head_cells( blockId : number ) {
			return this.cell_contents( blockId )[ 0 ]
			.map( ( cell , cellId )=> this.Table_cell_head({ block : blockId , row : 0 , cell : cellId }) )
		}
		
		@ $mol_mem_key
		table_cells( id : { block : number , row : number } ) {
			return this.cell_contents( id.block )[ id.row ]
			.map( ( cell , cellId )=> this.Table_cell({ block : id.block , row : id.row , cell : cellId }) )
		}
		
		@ $mol_mem_key
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
		
		@ $mol_fiber.method
		text2spans( prefix : string , text : string ) {
			let index = 0
			const spans = [] as $mol_view[]
			this.$.$mol_syntax2_md_line.tokenize( text , ( name , found , chunks )=> {
				const id = `${prefix}/${index++}`
				
				switch( name ) {
					case 'text-link' : {
						if( /^(\w+script+:)+/.test( chunks[ 1 ] ) ) {
							const span = this.Span( id )
							span.content( this.text2spans( id , chunks[ 0 ] ) )
							return spans.push( span )
						} else {
							const span = this.Link( id )
							span.type( name )
							span.link( this.uri_resolve( chunks[ 1 ] ) )
							span.content( this.text2spans( id , chunks[ 0 ] ) )
							return spans.push( span )
						}
					}
					case 'image-link' : {
						const span = this.Image( chunks[ 1 ] )
						span.type( name )
						span.link( this.uri_resolve( chunks[ 1 ] ) )
						span.title( chunks[ 0 ] )
						return spans.push( span )
					}
					case 'code3' :
					case 'code' : {
						const span = this.Span( id )
						span.type( 'code' )
						span.content( this.code2spans( id , chunks[ 0 ] ) )
						return spans.push( span )
					}
				}
				
				const span = this.Span( id )
				span.type( name )
				span.content(
					name
						? ([] as $mol_view[] ).concat.apply( [] , chunks.map( ( text , index )=> this.text2spans( `${id}/${index}` , text ) ) )
						: [ found ]
				)
				spans.push( span )
			} )
			return spans
		}
		
		@ $mol_fiber.method
		code2spans( prefix : string , text : string ) {
			let index = 0
			const spans = [] as $mol_view[]
			this.$.$mol_syntax2_md_code.tokenize( text , ( name , found , chunks )=> {
				const id = `${prefix}/${index++}`
				
				const span = this.Span( id )
				span.type( name )
				spans.push( span )
				
				switch( name ) {
					case 'code-docs' : {
						span.content( this.text2spans( `${id}/${index}` , found ) )
						return span
					}
					case 'code-string' : {
						span.content([ found[0] , ... this.code2spans( `${id}/${index}` , found.slice( 1 , found.length - 1 ) ) , found[ found.length - 1 ] ])
						return span
					}
					default : {
						span.content([ found ])
						return span
					}
				}
				
			} )
			return spans
		}
		
		@ $mol_mem_key
		block_content( indexBlock : number ) : ($mol_view|string)[] {
			
			const token = this.tokens()[ indexBlock ]
			
			switch( token.name ) {
				case 'header' : return this.text2spans( `${ indexBlock }` , token.chunks[2] )
				case 'list' : return this.text2spans( `${ indexBlock }` , token.chunks[0] )
				case 'code' : return this.code2spans( `${ indexBlock }` , token.chunks[2] )
				case 'code-indent' : return this.code2spans( `${ indexBlock }` , token.chunks[0].replace( /[\n\r]*$/ , '\n' ).replace( /^\t/gm , '' ) )
			}
			
			return this.text2spans( `${ indexBlock }` , token.chunks[0] )
		}
		
	}
}
