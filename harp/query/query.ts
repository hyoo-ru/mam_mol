namespace $ {
	
	export class $mol_harp_query {

		constructor(
			public name = '' ,
			public order? : 'asc' | 'desc' ,
			public filter? : 'only' | 'except' ,
			public values : $mol_vector_range< string | undefined >[] = [] ,
			public fetch : $mol_harp_query[] = [] ,
		) {}

		toJSON() {
			return this.toString()
		}

		toString() {

			const name = this.name
			const order = { asc : '+' , desc : '-' }[ this.order ] || ''
			const filter = { only : '=' , except : '!=' }[ this.filter ] || ''
			
			const value = this.values.map( ({ min , max }) => {

				if( min === max ) return encodeURIComponent( min )
				
				min = ( min === undefined ) ? '' : encodeURIComponent( min )
				max = ( max === undefined ) ? '' : encodeURIComponent( max )
				
				return `${ min }&${ max }`

			} ).join( ',' )

			const fetch = this.fetch.map( harp => `[${ harp }]` ).join( '' )

			return order + name + filter + value + fetch

		}

		static syntax = new $mol_syntax2({
			'filter' : /!?=/ ,
			'list' : /,/ ,
			'range' : /&/ ,
			'fetch_open' : /\[/ ,
			'fetch_close' : /\]/ ,
		})

		static parse( uri : string ) {

			let stack = [] as $mol_harp_query[][]
			let queries = [] as $mol_harp_query[]
			let query : $mol_harp_query | undefined
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
						range = new this.$.$mol_vector_range( range ? range.min : text , text )
						
					} else {
	
						const [ , order , name ] = /^([+-]?)(.*)$/.exec( text )
	
						query = new this( name , { '+' : 'asc' , '-' : 'desc' }[ order ] )
						
						queries.push( query )
	
					}
					
				} ,
				
				'filter' : ( filter , chinks , offset )=> {
	
					if( !query ) {
						query = new this
						queries.push( query )
					}
					
					query.filter = { '=' : 'only' , '!=' : 'except' }[ filter ]
					
				} ,
	
				'list' : ( found , chunks , offset )=> {
	
					if( !range ) fail_at( offset )
					
					query.values.push( range )
					range = undefined
	
				} ,
				
				'range' : ( found , chunks , offset )=> {
	
					range = new this.$.$mol_vector_range( range && range.min , undefined )
	
				} ,
				
				'fetch_open' : ( found , chunks , offset )=> {
	
					if( range ) {
						query.values.push( range )
						range = undefined
					}
					
					if( !query ) {
						query = new this
						queries.push( query )
					}
	
					stack.push( queries )
					queries = query.fetch
					query = undefined
	
				} ,
				
				'fetch_close' : ()=> {
	
					if( range ) {
						query.values.push( range )
						range = undefined
					}
					
					queries = stack.pop()
					query = queries[ queries.length - 1 ]
	
				} ,
	
			} )
	
			if( range ) {
				query.values.push( range )
				range = undefined
			}
			
			return queries[0]
		}
	
	}

}
