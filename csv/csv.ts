namespace $ {
	
	export function $mol_csv_parse( text : string , delimiter = ';' ) {
		var lines = text.split( /\r?\n/g )
		var header = lines.shift().split( delimiter )
		
		var res : { [ key : string ] : any }[] = []
		
		lines.forEach( line => {
			if( !line ) return
			
			var row : { [ key : string ] : any } = {}
			
			line.split( delimiter ).forEach( ( val , index ) => {
				row[ header[ index ] ] = val
			} )
			
			res.push( row )
		} )
		
		return res
	}
	
}
