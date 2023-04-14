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
				const val = String( item[ field ] ?? '' )
				row.push( '"' + val.replace( /"/g , '""' ) + '"' )
			}
			
		}
		
		return rows.map( row => row.join( delimiter ) ).join( '\n' )
		
	}
	
}
