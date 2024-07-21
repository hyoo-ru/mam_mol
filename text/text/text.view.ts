namespace $.$$ {
	/**
	 * Markdown visualizer.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_demo
	 */
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
					case 'spoiler': return this.Spoiler( index )
					case 'header': return this.Header( index )
					case 'list': return this.List( index )
					case 'code': return this.Pre( index )
					case 'code-indent': return this.Pre( index )
					case 'table': return this.Table( index )
					case 'grid': return this.Grid( index )
					case 'cut': return this.Cut( index )
					default: return this.Paragraph( index )
				}
				
			} )
		}
		
		@ $mol_mem
		param() {
			return this.toString().replace( /^.*?[\)>]\./, '' ).replace( /[(<>)]/g, '' )
		}
		
		@ $mol_mem_key
		header_level( index: number ) {
			return this.flow_tokens()[ index ].chunks[0].length
		}
		
		@ $mol_mem_key
		header_arg( index: number ) {
			return {
				[ this.param() ]: this.block_text( index )
			}
		}
		
		list_type( index: number ) {
			return this.flow_tokens()[ index ].chunks[1] ?? ''
		}
		
		item_index( index: number ) {
			return this.flow_tokens().slice( 0, index ).filter( token => token.name === 'block' ).length + 1
		}
		
		@ $mol_mem_key
		pre_text( index : number ) {
			const token = this.flow_tokens()[ index ]
			return ( token.chunks[2] ?? token.chunks[0].replace( /^(\t|  (?:\+\+|--|\*\*|  ))/gm , '' ) ).replace( /[\n\r]*$/ , '' )
		}
		
		@ $mol_mem_key
		quote_text( index : number ) {
			return this.flow_tokens()[ index ].chunks[0].replace( /^[>"] /mg , '' )
		}
		
		@ $mol_mem_key
		list_text( index : number ) {
			return this.flow_tokens()[ index ].chunks[0].replace( /^([-*+]|(?:\d+[\.\)])+) ?/mg , '' ).replace( /^  ?/mg, '' )
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
		
		@ $mol_mem_key
		grid_content( indexBlock: number ) {
			return [ ... this.flow_tokens()[ indexBlock ].chunks[ 0 ].match( /(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm )! ]
			.map( ( row , rowId ) => {
				const cells = [] as string[]
				for( const line of row.trim().split( /\r?\n/ ) ) {
					const [ _, indent, content ] = /^( *)! (.*)/.exec( line )!
					const col = Math.ceil( indent.length / 2 )
					cells[ col ] = ( cells[ col ] ? cells[ col ] + '\n' : '' ) + content
				}
				return cells
			} )
		}
		
		@ $mol_mem_key
		grid_rows( blockId: number ) {
			return this.grid_content( blockId )
			.map( ( row, rowId )=> this.Grid_row({ block: blockId , row: rowId }) )
		}
		
		@ $mol_mem_key
		grid_cells( id: { block: number, row: number } ) {
			return this.grid_content( id.block )[ id.row ]
			.map( ( cell , cellId )=> this.Grid_cell({ block: id.block, row: id.row, cell: cellId }) )
		}
		
		@ $mol_mem_key
		grid_cell_text( id: { block: number, row: number, cell: number } ) {
			return this.grid_content( id.block )[ id.row ][ id.cell ]
		}
		
		uri_base() {
			return $mol_dom_context.document.location.href
		}
		
		@ $mol_mem
		uri_base_abs() {
			return new URL( this.uri_base() , $mol_dom_context.document.location.href )
		}
		
		@ $mol_mem_key
		uri_resolve( uri: string ) {
			
			if( /^(\w+script+:)+/.test( uri ) ) return null as any as string
			
			if( /^#\!/.test( uri ) ) {
				
				const params: Record< string, string > = {}
			
				for( const chunk of uri.slice(2).split( this.$.$mol_state_arg.separator ) ) {
					if( !chunk ) continue
					const vals = chunk.split( '=' ).map( decodeURIComponent )
					params[ vals.shift()! ] = vals.join( '=' )
				}
				
				return this.$.$mol_state_arg.link( params )
	
			}
			
			try {
				
				const url = new URL( uri , this.uri_base_abs() )
				return url.toString()
				
			} catch( error ) {
				
				$mol_fail_log( error )
				return null as any as string
				
			}
			
		}
		
		code_syntax() {
			return this.$.$mol_syntax2_md_code
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
			
			const { name, found, chunks } = this.line_token( path )
			
			switch( name ) {
				case 'link': return chunks[0] || chunks[1].replace( /^.*?\/\/|\/.*$/g, '' )
				case 'text-link': return chunks[0] || chunks[1].replace( /^.*?\/\/|\/.*$/g, '' )
				default: return ( chunks[0] || chunks[1] || chunks[2] ) ?? found
			}
			
		}
		
		@ $mol_mem_key
		line_content( path: readonly number[] ) {
			return this.line_tokens( path ).map( ( { name, chunks }, index )=> {
				
				const path2 = [ ... path, index ]
				
				switch( name ) {
					case 'embed': return this.Embed( path2 )
					case 'link' : return this.Link( path2 )
					case 'text-link-http': return this.Link_http( path2 )
					case 'text-link' : return this.Link( path2 )
					case 'image-link': return this.Embed( path2 )
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

		@ $mol_mem_key
		spoiler_text( index: number ): string {
			return this.flow_tokens()[ index ].chunks[0].replace( /^[\?] /mg , '' );
		}

		@ $mol_mem_key
		spoiler_label( index: number ): string {
			return this.spoiler_text(index).split('\n')[0];
		}
	
		@ $mol_mem_key
		spoiler_content( index: number): string {
			return this.spoiler_text(index).split('\n').slice(1).join('\n');
		}
	}
	
	export class $mol_text_header extends $.$mol_text_header {
		
		dom_name() {
			return 'h' + this.level()
		}
		
	}

}
