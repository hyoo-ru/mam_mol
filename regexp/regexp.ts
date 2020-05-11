namespace $ {

	export type $mol_regexp_source =
	| string
	| RegExp
	| { [ key in string ] : $mol_regexp_source }
	| readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

	export type $mol_regexp_groups< Source extends $mol_regexp_source >
	
		= Source extends string
		? never
		
		: Source extends $mol_regexp< infer G >
		? G
		
		: Source extends $mol_regexp_source[]
		? $mol_type_intersect<
			{
				[ key in Extract< keyof Source , number > ] : $mol_regexp_groups< Source[ key ] >
			}[ Extract< keyof Source , number > ]
		>
		
		: Source extends RegExp
		? never
		
		: Source extends { readonly [ key in string ] : $mol_regexp_source }
		? Extract< $mol_type_intersect<
			| { [ key in Extract< keyof Source , string > ] : string }
			| { [ key in keyof Source ] : $mol_regexp_groups< Source[ key ] > }[ keyof Source ]
		> , Record< string , string > >

		: never

	export class $mol_regexp< Groups extends Record< string , string > > extends RegExp {
		
		constructor( source : string , flags : string = '' , readonly groups : ( Extract< keyof Groups , string > )[] = [] ) {
			super( source , flags )
		}

		parse( str : string , from = 0 ) {

			this.lastIndex = from
			
			const res = super.exec( str )
			if( res === null ) return null

			const found = {} as { [ key in keyof Groups ] : string }

			for( let i = 0 ; i < this.groups.length ; ++i ) {
				found[ this.groups[ i ] ] = res[ i + 1 ]
			}

			return found

		}

		repeat(
			min = 0 ,
			max = Number.POSITIVE_INFINITY ,
		) {
	
			const upper = Number.isFinite( max ) ? max : ''
			
			return new $mol_regexp(
				`(?:${ this.source }){${ min },${ upper }}` ,
				this.flags ,
				this.groups ,
			)
	
		}

		static from<
			Source extends $mol_regexp_source
		>(
			source : Source ,
			flags = '' ,
		) : $mol_regexp< $mol_regexp_groups< Source > > {
		
			if( typeof source === 'string' ) {

				return new this( this.escape( source ) , flags )

			} else if( source instanceof RegExp ) {

				if( source instanceof $mol_regexp ) return source

				return new $mol_regexp( source.source , source.flags )

			} if( Array.isArray( source ) ) {

				const sources = [] as string[]
				const groups = [] as ( Extract< keyof $mol_regexp_groups< Source > , string > )[]
		
				for( const item of source ) {
					
					const regexp = $mol_regexp.from( item )
		
					sources.push( regexp.source )
					groups.push( ... regexp.groups )
		
				}
				
				return new this( sources.join( '' ) , flags , groups )
		
			} else {

				const list = Object.keys( source ).map( name => {

					const regexp = $mol_regexp.from( source[ name ] )
					
					return new this(
						`(${ regexp.source })` ,
						regexp.flags ,
						[ name , ... regexp.groups ] ,
					)

				} ) as any as readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

				return $mol_regexp.from( list , flags ) as any

			}
	
		}

		static escape( str : string ) : string {
			return str.replace( /[.*+?^${}()|[\]\\]/g , '\\$&' )
		}

		static digit = $mol_regexp.from( /\d/ )
		static letter = $mol_regexp.from( /\w/ )
		static begin = $mol_regexp.from( /^/ )
		static end = $mol_regexp.from( /$/ )
		
	}
	
}
