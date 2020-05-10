namespace $ {
	
	export class $mol_harp_query {

		constructor(
			public name = '' ,
			public order? : '+' | '-' ,
			public filter? : '=' | '@' ,
			public values : $mol_vector_range< string | undefined >[] = [] ,
			public fetch = {} as Record< string , $mol_harp_query > ,
		) {}

		toJSON() {
			return this.toString()
		}

		toString() : string {

			const order = this.order ?? ''
			const name = encodeURIComponent( this.name ?? '' )
			const filter = this.filter ?? ''
			
			const value = this.values.map( ({ min , max }) => {

				if( min !== undefined && min === max ) return encodeURIComponent( min )
				
				min = ( min === undefined ) ? '' : encodeURIComponent( min )
				max = ( max === undefined ) ? '' : encodeURIComponent( max )
				
				return `${ min }&${ max }`

			} ).join( ',' )

			const fetch = Object.values( this.fetch ).map( harp => `[${ harp }]` ).join( '' )

			return order + name + filter + value + fetch

		}

		static syntax = new $mol_syntax2({
			'filter' : /[=@]/ ,
			'list' : /,/ ,
			'range' : /&/ ,
			'fetch_open' : /\[/ ,
			'fetch_close' : /\]/ ,
		})

		static parse< This extends typeof $mol_harp_query >( this : This , uri : string ) {

			let queries = {} as Record< string , $mol_harp_query >
			let query : $mol_harp_query | undefined
			let stack = [] as typeof queries[]
			let range : $mol_vector_range< string | undefined > | undefined
	
			function fail_at( offset : number ) {
				const uri_marked = uri.substring( 0 , offset ) + '\u035C' + uri.substring( offset )
				$mol_fail( new Error( `Unexpected token at ${ offset } of "${ uri_marked }"` ) )
			}
			
			this.syntax.parse( uri , {
	
				'' : ( text , chunks , offset ) => {
	
					if( query ) {
						
						if( !query.filter ) fail_at( offset )
	
						text = decodeURIComponent( text )
						range = new $mol_vector_range( range ? range.min : text , text )
						
					} else {
	
						let [ , order , name ] = /^([+-]?)(.*)$/.exec( text )!
						name = decodeURIComponent( name )
	
						query = new this( name , order as any )
						
						queries[ name ] = query
	
					}
					
				} ,
				
				'filter' : ( filter , chinks , offset )=> {
	
					if( !query ) {
						query = new this
						queries[ '' ] = query
					}
					
					query.filter = filter as any
					
				} ,
	
				'list' : ( found , chunks , offset )=> {
	
					if( !range ) fail_at( offset )
					
					query!.values.push( range! )
					range = undefined
	
				} ,
				
				'range' : ( found , chunks , offset )=> {
	
					range = new $mol_vector_range( range && range.min , undefined )
	
				} ,
				
				'fetch_open' : ( found , chunks , offset )=> {
	
					if( range ) {
						query!.values.push( range )
						range = undefined
					}
					
					if( !query ) {
						query = new this
						queries[ '' ] = query
					}
	
					stack.push( queries )
					queries = query.fetch
					query = undefined
	
				} ,
				
				'fetch_close' : ()=> {
	
					if( range ) {
						query!.values.push( range )
						range = undefined
					}
					
					queries = stack.pop()!
					query = Object.values( queries ).slice( -1 )[0]
	
				} ,
	
			} )
	
			if( range ) {
				query!.values.push( range )
				range = undefined
			}
			
			return Object.values( queries )[0] as InstanceType< This > 
		}
	
	}

}
