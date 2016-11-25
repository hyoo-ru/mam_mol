namespace $.$mol {
	export class $mol_texter extends $.$mol_texter {
		
		@ $mol_mem()
		tokensFlow() {
			return $mol_syntax_md_flow.tokenize( this.text() )
		}
		
		rows() {
			return this.tokensFlow().map( ( token , index )=> {
				switch( token.name ) {
					case 'table' : return this.tabler( index )
					case 'header' : return this.header( index )
				}
				return this.rower( index )
			} )
		}
		
		headerLevel( index : number ) {
			return this.tokensFlow()[ index ].chunks[0].length
		}
		
		headerContent( index : number ) {
			return this.text2spans( `${ index }` , this.tokensFlow()[ index ].chunks[2] )
		}
		
		blockType( index : number ) {
			return this.tokensFlow()[ index ].name
		}
		
		@ $mol_mem()
		cellContents( indexBlock : number ) {
			return this.tokensFlow()[ indexBlock ].chunks[ 0 ]
			.split( /\r?\n/g )
			.filter( row => row && !/\|--/.test( row ) )
			.map( ( row , rowId ) => {
				return row.split( /\|/g )
				.filter( cell => cell )
				.map( ( cell , cellId )=> cell.trim() )
			} )
		}
		
		tablerRowers( blockId : number ) {
			return this.cellContents( blockId )
			.slice( 1 )
			.map( ( row , rowId )=> this.tablerRower({ block : blockId , row : rowId + 1 }) )
		}
		
		tablerHeaderCellers( blockId : number ) {
			return this.cellContents( blockId )[ 0 ]
			.map( ( cell , cellId )=> this.tablerCellerHeader({ block : blockId , row : 0 , cell : cellId }) )
		}
		
		tablerCellers( id : { block : number , row : number } ) {
			return this.cellContents( id.block )[ id.row ]
			.map( ( cell , cellId )=> this.tablerCeller({ block : id.block , row : id.row , cell : cellId }) )
		}
		
		tablerCellerContent( id : { block : number , row : number , cell : number } ) {
			return this.text2spans( `${ id.block }/${ id.row }/${ id.cell }` , this.cellContents( id.block )[ id.row ][ id.cell ] )
		}
		
		text2spans( prefix : string , text : string ) {
			return $mol_syntax_md_line.tokenize( text ).map( ( token , index )=> {
				const id = `${prefix}/${index}`
				
				switch( token.name ) {
					case 'text-link' : {
						if( /^#|(\w+script+:)+/.test( token.chunks[ 1 ] ) ) {
							const span = this.spanner( id )
							span.content( this.text2spans( id , token.chunks[ 0 ] ) )
							return span
						} else {
							const span = this.linker( id )
							span.type( token.name )
							span.link( token.chunks[ 1 ] )
							span.content( this.text2spans( id , token.chunks[ 0 ] ) )
							return span
						}
					}
					case 'image-link' : {
						const span = this.imager( id )
						span.type( token.name )
						span.link( token.chunks[ 1 ] )
						span.title( token.chunks[ 0 ] )
						return span
					}
					case 'code3' :
					case 'code' : {
						const span = this.spanner( id )
						span.type( 'code' )
						span.content([ token.chunks[ 0 ] ])
						return span
					}
				}
				
				const span = this.spanner( id )
				span.type( token.name )
				span.content(
					token.name
						? [].concat.apply( [] , token.chunks.map( ( text , index )=> this.text2spans( `${id}/${index}` , text ) ) )
						: [ token.found ]
				)
				return span
			} )
		}
		
		blockContent( indexBlock : number ) : ($mol_viewer|string)[] {
			
			const token = this.tokensFlow()[ indexBlock ]
			
			switch( token.name ) {
				case 'header' : return this.text2spans( `${ indexBlock }` , token.chunks[2] )
				case 'list-item' : return this.text2spans( `${ indexBlock }` , token.chunks[1] )
				case 'code' : return [ token.chunks[2] ]
			}
			
			return this.text2spans( `${ indexBlock }` , token.chunks[0] )
		}
		
	}
}
