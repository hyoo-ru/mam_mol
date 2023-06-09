namespace $ {
	
	/**
	 * Parse csv text with delimiter
	 * @see @see https://mol.hyoo.ru/#!section=demos/demo=mol_csv_parse
	 */
	export function $mol_csv_parse( text: string, delimiter = ',' ) {
		
		var lines = text.split( /\r?\n/g )
		var header = lines.shift()!.split( delimiter )
		
		var res : Record< string, any >[] = []
		
		for( const line of lines ) {
			
			if( !line ) continue
			
			var row : { [ key : string ] : any } = {}
			
			for( const [ index, val ] of line.split( delimiter ).entries() ) {
				row[ header[ index ] ] = val.replace( /^"|"$/g, '' ).replace( /""/g, '"' )
			}
			
			res.push( row )
			
		}
		
		return res
	}

}
