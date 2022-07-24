namespace $ {
	
	export function $mol_harp_to_string< Query extends $mol_harp_query >( query: Query ): string {

		return Object.entries( query ).map( ([ field, harp ])=> {
			
			if( field === '+' ) return ''
			if( field === '=' ) return ''
			if( field === '@' ) return ''
			if( !harp ) return ''
			
			const order = harp['+'] === true ? '+' : harp['+'] === false ? '-' : ''
			const filter = harp['='] ? '=' : harp['@'] ? '@' : ''
			const name = encodeURIComponent( field )
			
			let values = ( ( harp['='] || harp['@'] || [] ) as unknown[][] ).map( ([ min , max ]) => {

				if( max === undefined || min === max ) return encodeURIComponent( String( min ) )
				
				min = ( min === undefined ) ? '' : encodeURIComponent( String( min ) )
				max = ( max === undefined ) ? '' : encodeURIComponent( String( max ) )
				
				return `${ min }&${ max }`

			} ).join( ',' )
			
			let fetch = $mol_harp_to_string( harp as $mol_harp_query )
			if( fetch ) fetch = `[${fetch}]`

			return `${order}${name}${filter}${values}${fetch}`
			
		}).filter( Boolean ).join( ';' )

	}

}
