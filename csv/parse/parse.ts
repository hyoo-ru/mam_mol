namespace $ {
	
	/**
	 * Parse csv text with delimiter
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_csv_parse
	 */
	export function $mol_csv_parse( text: string, delimiter = ',' ) {
		
		const lines = $mol_csv_parse_table( text, delimiter )
		const header = lines.shift()!
		
		const res : Record< string, any >[] = []
		
		for( const line of lines ) {
			
			const row : { [ key : string ] : any } = {}
			res.push( row )
			
			for( let i = 0; i < header?.length; ++i ) {
				row[ header[ i ] ] = line[i]
			}
			
		}
		
		return res
	}
	
	export function $mol_csv_parse_table( text: string, delimiter = ',' ) {
		
		const syntax = $mol_csv_syntax( delimiter )
		const rows = [] as string[][]
		
		for( const line of text.matchAll( syntax.row ) ) {
			if( !line.groups ) continue
			
			const cells = [] as string[]
			rows.push( cells )
			
			for( const item of line.groups.row.matchAll( syntax.cell ) ) {
				if( !item.groups ) continue
				
				const text = item.groups.inline
					|| item.groups.quote.slice( 1, -1 ).replace( /""/g, '"' )
				cells.push( text )
				
			}
			
		}
		
		return rows
	}

}
