namespace $ {
	
	/**
	 * Serialize csv data with delimiter
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_csv_serial
	 */
	export function $mol_csv_serial( data: Record< string, any >[], delimiter = ',' ) {
		
		const fields = new Set< string >()
		
		for( const item of data ) {
			for( const field of Object.keys( item ) ) {
				fields.add( field )
			}
		}
		
		const rows = [[ ... fields ]]
		
		for( const item of data ) {
			
			const row = [] as string[]
			rows.push( row )
			
			for( const field of fields ) {
				row.push( String( item[ field ] ?? '' ) )
			}
			
		}
		
		return $mol_csv_serial_table( rows, delimiter )
		
	}
	
	export function $mol_csv_serial_table( rows: string[][], delimiter = ',' ) {
		
		return rows.map( row =>
			row.map( cell =>
				'"' + String( cell ).replace( /"/g , '""' ) + '"'
			).join( delimiter )
		).join( '\n' )
		
	}
	
}
