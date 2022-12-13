namespace $.$$ {
	export class $mol_text extends $.$mol_text {
		
		@ $mol_mem
		flow_tokens() {
			const tokens = [] as { name : string , found : string , chunks: string[] }[]
			this.$.$mol_syntax2_md_flow.tokenize(
				this.text(),
				( name , found , chunks )=> tokens.push({ name , found , chunks }),
			)
			return tokens as Readonly< typeof tokens >
		}
		
		@ $mol_mem_key
		block_type( index: number ) {
			return this.flow_tokens()[ index ].name
		}
		
		@ $mol_mem
		rows() {
			return this.flow_tokens().map( ( { name }, index )=> {
				
				switch( name ) {
					case 'quote': return this.Quote( index )
					case 'header': return this.Header( index )
					case 'list': return this.List( index )
					case 'code': return this.Pre( index )
					case 'code-indent': return this.Pre( index )
					case 'table': return this.Table( index )
					default: return this.Paragraph( index )
				}
				
			} )
		}
		
		@ $mol_mem
		param() {
			return this.toString().replace( /^.*?\)\./, '' ).replace( /[()]/g, '' )
		}
		
		@ $mol_mem_key
		header_level( index: number ) {
			return 'h' + this.flow_tokens()[ index ].chunks[0].length
		}
		
		@ $mol_mem_key
		header_arg( index: number ) {
			return {
				[ this.param() ]: this.flow_tokens()[ index ].chunks[2]
			}
		}
		
		@ $mol_mem_key
		pre_text( index : number ) {
			const token = this.flow_tokens()[ index ]
			return ( token.chunks[2] ?? token.chunks[0].replace( /^(\t|    )/gm , '' ) ).replace( /[\n\r]*$/ , '' )
		}
		
		@ $mol_mem_key
		quote_text( index : number ) {
			return this.flow_tokens()[ index ].chunks[0].replace( /^> /mg , '' )
		}
		
		@ $mol_mem_key
		list_text( index : number ) {
			return this.flow_tokens()[ index ].chunks[0].replace( /^([-*+ ]|\d+\.) ?/mg , '' ).replace( /^  /mg, '' )
		}
		
		@ $mol_mem_key
		cell_content( indexBlock : number ) {
			return this.flow_tokens()[ indexBlock ].chunks[ 0 ]
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
			return this.cell_content( blockId )
			.slice( 1 )
			.map( ( row , rowId )=> this.Table_row({ block : blockId , row : rowId + 1 }) )
		}
		
		@ $mol_mem_key
		table_head_cells( blockId : number ) {
			return this.cell_content( blockId )[ 0 ]
			.map( ( cell , cellId )=> this.Table_cell({ block : blockId , row : 0 , cell : cellId }) )
		}
		
		@ $mol_mem_key
		table_cells( id : { block : number , row : number } ) {
			return this.cell_content( id.block )[ id.row ]
			.map( ( cell , cellId )=> this.Table_cell({ block : id.block , row : id.row , cell : cellId }) )
		}
		
		@ $mol_mem_key
		table_cell_text( id : { block : number , row : number , cell : number } ) {
			return this.cell_content( id.block )[ id.row ][ id.cell ]
		}
		
		uri_base() {
			return $mol_dom_context.document.location.href
		}
		
		@ $mol_mem_key
		uri_resolve( uri: string ) {
			
			if( /^(\w+script+:)+/.test( uri ) ) return null
			
			const url = new URL( uri , this.uri_base() )
			return url.toString()
			
		}
		
		@ $mol_mem_key
		block_text( index: number ) {
			
			const token = this.flow_tokens()[ index ]
			
			switch( token.name ) {
				case 'header' : return token.chunks[2]
				default: return token.chunks[0]
			}
			
		}
		
		block_content( index: number ) {
			return this.line_content([ index ])
		}
		
		@ $mol_mem_key
		line_tokens( path: readonly number[] ) {
			
			const tokens = [] as { name : string , found : string , chunks: string[] }[]
			
			this.$.$mol_syntax2_md_line.tokenize(
				this.line_text( path ),
				( name , found , chunks )=> tokens.push({ name , found , chunks }),
			)
			
			return tokens as Readonly< typeof tokens >
			
		}
		
		@ $mol_mem_key
		line_token( path: readonly number[] ) {
			const tokens = this.line_tokens( path.slice( 0, path.length - 1 ) )
			return tokens[ path[ path.length - 1 ] ]
		}
		
		@ $mol_mem_key
		line_type( path: readonly number[] ) {
			return this.line_token( path ).name
		}
		
		@ $mol_mem_key
		line_text( path: readonly number[] ) {
			
			if( path.length === 1 ) return this.block_text( path[0] )
			
			const { found, chunks } = this.line_token( path )
			return ( chunks[0] || chunks[1] ) ?? found
		}
		
		@ $mol_mem_key
		line_content( path: readonly number[] ) {
			return this.line_tokens( path ).map( ( { name, chunks }, index )=> {
				
				const path2 = [ ... path, index ]
				
				switch( name ) {
					case 'text-link-http': return this.Link_http( path2 )
					case 'text-link' : return this.Link( path2 )
					case 'image-link': return this.Embed( path2 )
					case 'code3': return this.Code_line( path2 )
					case 'code': return this.Code_line( path2 )
					case '': return this.String( path2 )
					default: return this.Span( path2 )
				}
				
			} )
		}
		
		@ $mol_mem_key
		link_uri( path: readonly number[] ) {
			
			const token = this.line_token( path )
			const uri = this.uri_resolve( token.chunks[1] ?? token.found )
			
			if( !uri ) throw new Error( 'Bad link' )
			return uri
			
		}
		
		@ $mol_mem_key
		link_host( path: readonly number[] ) {
			return this.link_uri( path ).replace( /^.*?\/\/|\/.*$/g, '' )
		}
		
		@ $mol_mem
		auto_scroll() {
			for( const [ index, token ] of this.flow_tokens().entries() ) {
				
				if( token.name !== 'header' ) continue
				
				const header = this.Header( index )
				if( !header.Link().current() ) continue
				
				new $mol_after_tick(
					()=> this.ensure_visible( header )
				)
				
			}
		}

	}

}
