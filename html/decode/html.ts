namespace $ {
	
	export function $mol_html_decode( text : string ) {
		return text
		.replace( /&(?:#(\d+)|(lt|gt|quot));/gi , ( str , numb , name )=> {
			if( numb ) return String.fromCharCode( numb )
			
			const mapping = {
				'lt' : '<' ,
				'gt' : '>' ,
				'quot' : '"' ,
				'amp' : '&' ,
			}
			
			return mapping[ name ]
		} )
	}
	
}
