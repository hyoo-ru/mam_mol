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

	/** Type safe reguar expression builder */
	export class $mol_regexp< Groups extends Record< string , string > > extends RegExp {
		
		/** Prefer to use $mol_regexp.from */
		constructor( source : string , flags : string = '' , readonly groups : ( Extract< keyof Groups , string > )[] = [] ) {
			super( source , flags )
		}

		/** Parses input and returns found capture groups or null */
		parse( str : string , from = 0 ) {

			this.lastIndex = from
			
			const res = super.exec( str )
			if( res === null ) return null

			const found = {} as { [ key in keyof Groups ] : string }

			for( let i = 0 ; i < this.groups.length ; ++i ) {
				const group = this.groups[ i ]
				found[ group ] = found[ group ] || res[ i + 1 ] || ''
			}

			return found

		}

		/** Makes regexp that non-greedy repeats this pattern from min to max count */
		static repeat(
			source : $mol_regexp_source ,
			min = 0 ,
			max = Number.POSITIVE_INFINITY ,
		) {
	
			const regexp = $mol_regexp.from( source )
			const upper = Number.isFinite( max ) ? max : ''
			
			return new $mol_regexp(
				`(?:${ regexp.source }){${ min },${ upper }}?` ,
				regexp.flags ,
				regexp.groups ,
			)
	
		}

		/** Makes regexp that greedy repeats this pattern from min to max count */
		static repeat_greedy(
			source : $mol_regexp_source ,
			min = 0 ,
			max = Number.POSITIVE_INFINITY ,
		) {
	
			const regexp = $mol_regexp.from( source )
			const upper = Number.isFinite( max ) ? max : ''
			
			return new $mol_regexp(
				`(?:${ regexp.source }){${ min },${ upper }}` ,
				regexp.flags ,
				regexp.groups ,
			)
	
		}

		/** Makes regexp that allow absent of this pattern */
		static optional( source : $mol_regexp_source ) {
			return $mol_regexp.repeat_greedy( source , 0 , 1 )
		}

		/** Makes regexp that look ahead for pattern */
		static force_after( source : $mol_regexp_source ) {

			const regexp = $mol_regexp.from( source )
			
			return new $mol_regexp(
				`(?=${ regexp.source })` ,
				regexp.flags ,
				regexp.groups ,
			)

		}

		/** Makes regexp that look ahead for pattern */
		static forbid_after( source : $mol_regexp_source ) {

			const regexp = $mol_regexp.from( source )
			
			return new $mol_regexp(
				`(?!${ regexp.source })` ,
				regexp.flags ,
				regexp.groups ,
			)

		}

		/** Converts some js values to regexp */
		static from<
			Source extends $mol_regexp_source
		>(
			source : Source ,
			flags = '' ,
		) : $mol_regexp< $mol_regexp_groups< Source > > {
		
			if( typeof source === 'string' ) {

				return new this( source.replace( /[.*+?^${}()|[\]\\]/g , '\\$&' ) , flags )

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
				
				return new this( `(?:${ sources.join( '' ) })` , flags , groups )
		
			} else {

				const groups = [] as string[]

				const chunks = Object.keys( source ).map( name => {

					groups.push( name )

					const regexp = $mol_regexp.from( source[ name ] )
					groups.push( ... regexp.groups )
					
					return `(${regexp.source})`

				} ) as any as readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

				return new this( `(?:${ chunks.join('|') })` , flags , groups as any[] )

			}
	
		}

		/** Makes regexp for char code */
		static char_code( code : number ) {
			return new this( `\\u${ code.toString(16).padStart( 4 , '0' ) }` )
		}

		static byte = $mol_regexp.from( /[\s\S]/ )
		static digit = $mol_regexp.from( /\d/ )
		static letter = $mol_regexp.from( /\w/ )
		static space = $mol_regexp.from( /\s/ )
		static word_break = $mol_regexp.from( /\b/ )
		static line_end = $mol_regexp.from( /\r?\n/ )
		static begin = $mol_regexp.from( /^/ )
		static end = $mol_regexp.from( /$/ )
		static or = $mol_regexp.from( /|/ )
		
	}
	
}
