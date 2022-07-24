namespace $ {
	
	const syntax = new $mol_syntax2({
		'filter' : /[=@]/ ,
		'list_separator' : /,/ ,
		'range_separator' : /&/ ,
		'fetch_open' : /\[/ ,
		'fetch_separator' : /;/ ,
		'fetch_close' : /\]/ ,
	})

	export function $mol_harp_from_string( uri: string ): $mol_harp_query {
		
		let parent = {} as $mol_harp_query
		let prev = null as null | $mol_harp_query
		let stack = [ parent ]
		let range = null as null | string[]
		let values = null as null | string[][]

		function fail_at( offset : number ) {
			const uri_marked = uri.substring( 0 , offset ) + '\u035C' + uri.substring( offset )
			$mol_fail( new Error( `Unexpected token at ${ offset } of "${ uri_marked }"` ) )
		}
		
		syntax.parse( uri , {

			'' : ( text , chunks , offset ) => {

				if( values ) {

					text = decodeURIComponent( text )
					range = range ? [ range[0] , text ] : [ text ]
					
				} else {

					let [, order, name ] = /^([+-]?)(.*)$/.exec( text )!
					prev = parent[ decodeURIComponent( name ) ] = {}
					if( order ) prev[ '+' ] = order === '+'
					stack.push( parent )

				}
				
			} ,
			
			'filter' : ( filter , chinks , offset )=> {
				
				if( prev ) {
					
					values = prev[ filter as '=' | '@' ] = [] as string[][]
					
				} else {
					
					values = [] as string[][]
					parent[ '' ] = values
					
				}
				
			} ,

			'list_separator' : ( found , chunks , offset )=> {

				if( !range ) fail_at( offset )
				
				values!.push( range! )
				range = null

			} ,
			
			'range_separator' : ( found , chunks , offset )=> {
				
				if( !values ) fail_at( offset )
				
				range = [ range?.[0] ?? '', '' ]
				
			} ,
			
			'fetch_open' : ( found , chunks , offset )=> {

				if( range ) {
					values!.push( range )
					range = null
				}
				
				if( !prev ) fail_at( offset )
				
				parent = prev!
				values = null
				prev = null

			} ,
			
			'fetch_separator': ( found , chunks , offset )=> {
				
				if( range ) {
					values!.push( range )
					range = null
				}
				
				parent = stack.pop()!
				values = null
				prev = null
				
			},
			
			'fetch_close' : ()=> {

				if( range ) {
					values!.push( range )
					range = null
				}
				
				parent = stack.pop()!
				values = null
				prev = null

			} ,

		} )

		if( range ) values!.push( range )
		
		return stack[0]
	}

}
