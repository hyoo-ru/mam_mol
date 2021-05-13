namespace $ {

	export type $mol_regexp_source =
	| string
	| RegExp
	| { [ key in string ] : $mol_regexp_source }
	| readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

	export type $mol_regexp_groups< Source extends $mol_regexp_source >
	
		= Source extends string
		? {}
		
		: Source extends $mol_regexp< infer Groups >
		? Groups
		
		: Source extends $mol_regexp_source[]
		? $mol_type_intersect<
			{
				[ key in Extract< keyof Source , number > ] : $mol_regexp_groups< Source[ key ] >
			}[ Extract< keyof Source , number > ]
		>
		
		: Source extends RegExp
		? {}
		
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
		get parse() { 

			type Token = { [ key in keyof Groups ] : string } & { [ key : number ] : string }

			const self = this

			return function* parsing( str : string , from = 0 ) {

				while( from < str.length ) {

					self.lastIndex = from
					
					const res = self.exec( str )
					if( res === null ) {
						yield { 0 : str.substring( from ) } as any as Token
						return null
					}

					if( from === self.lastIndex ) {
						$mol_fail( new Error( 'Captured empty substring' ) )
					}

					const found = {} as any as Token
					
					const skipped = str.slice( from , self.lastIndex - res[0].length )
					if( skipped ) yield { 0 : skipped } as any as Token
					
					from = self.lastIndex
					
					for( let i = 0 ; i < self.groups.length ; ++i ) {
						const group = self.groups[ i ]
						found[ group ] = found[ group ] || res[ i + 1 ] || '' as any
					}

					yield found
				}

			}

		}

		/** Makes regexp that non-greedy repeats this pattern from min to max count */
		static repeat<
			Source extends $mol_regexp_source
		>(
			source : Source ,
			min = 0 ,
			max = Number.POSITIVE_INFINITY ,
		) : $mol_regexp< $mol_regexp_groups< Source > > {
	
			const regexp = $mol_regexp.from( source )
			const upper = Number.isFinite( max ) ? max : ''
			
			return new $mol_regexp(
				`(?:${ regexp.source }){${ min },${ upper }}?` ,
				regexp.flags ,
				regexp.groups ,
			)
	
		}

		/** Makes regexp that greedy repeats this pattern from min to max count */
		static repeat_greedy<
			Source extends $mol_regexp_source
		>(
			source : Source ,
			min = 0 ,
			max = Number.POSITIVE_INFINITY ,
		) : $mol_regexp< $mol_regexp_groups< Source > > {
	
			const regexp = $mol_regexp.from( source )
			const upper = Number.isFinite( max ) ? max : ''
			
			return new $mol_regexp(
				`(?:${ regexp.source }){${ min },${ upper }}` ,
				regexp.flags ,
				regexp.groups ,
			)
	
		}

		/** Makes regexp that allow absent of this pattern */
		static optional<
			Source extends $mol_regexp_source
		>( source : Source ) {
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
			{ ignoreCase , multiline } : Partial< Pick< RegExp , 'ignoreCase' | 'multiline' > > = {
				ignoreCase : false ,
				multiline : false ,
			} ,
		) : $mol_regexp< $mol_regexp_groups< Source > > {

			let flags = 'gu'
			if( multiline ) flags += 'm'
			if( ignoreCase ) flags += 'i'

			if( typeof source === 'string' ) {

				return new $mol_regexp( source.replace( /[.*+?^${}()|[\]\\]/g , '\\$&' ) , flags )

			} else if( source instanceof RegExp ) {

				if( source instanceof $mol_regexp ) return source as any

				const test = new $mol_regexp( '|' + source.source )
				const groups = Array.from(
					{ length : test.exec('')!.length - 1 } ,
					( _ , i )=> String( i + 1 ) ,
				)

				return new $mol_regexp( source.source , source.flags , groups as any )

			} if( Array.isArray( source ) ) {

				const sources = [] as string[]
				const groups = [] as ( Extract< keyof $mol_regexp_groups< Source > , string > )[]

				let index = 0
		
				for( const item of source ) {
					
					const regexp = $mol_regexp.from( item )
		
					sources.push( regexp.source )

					for( let group of regexp.groups ) {
						if( Number( group ) >= 0 ) {
							groups.push( String( index ++ ) as any )
						} else {
							groups.push( group )
						}
					}
		
				}
				
				return new $mol_regexp( sources.join( '' ) , flags , groups )
		
			} else {

				const groups = [] as string[]

				const chunks = Object.keys( source ).map( name => {

					groups.push( name )

					const regexp = $mol_regexp.from( source[ name ] )
					groups.push( ... regexp.groups )
					
					return `(${regexp.source})`

				} ) as any as readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

				return new $mol_regexp( `(?:${ chunks.join('|') })` , flags , groups as any[] )

			}
	
		}

		/** Makes regexp for char code */
		static char_code( code : number ) {
			return new $mol_regexp(
				`\\u${ code.toString(16).padStart( 4 , '0' ) }`
			)
		}

		static char_range(
			from: number,
			to: number,
		): $mol_regexp< never> {
			return new $mol_regexp(
				`${ $mol_regexp.char_code( from ) }..${ $mol_regexp.char_code( to ) }`
			)
		}

		static char_only(
			... allowed: readonly [ $mol_regexp_source, ... $mol_regexp_source[] ]
		): $mol_regexp< never> {
			const regexp = allowed.map( f => $mol_regexp.from( f ).source ).join('')
			return new $mol_regexp( `[${ regexp }]` )
		}

		static char_except(
			... forbidden: readonly [ $mol_regexp_source, ... $mol_regexp_source[] ]
		): $mol_regexp< never> {
			const regexp = forbidden.map( f => $mol_regexp.from( f ).source ).join('')
			return new $mol_regexp( `[^${ regexp }]` )
		}

		static char_any = $mol_regexp.from( /[\s\S]/ )
		static digit = $mol_regexp.from( /\d/ )
		static letter = $mol_regexp.from( /\w/ )
		static space = $mol_regexp.from( /\s/ )
		static tab = $mol_regexp.from( /\t/ )
		static slash_back = $mol_regexp.from( /\\/ )
		static word_break = $mol_regexp.from( /\b/ )
		static line_end = $mol_regexp.from( /\r?\n/ )
		static begin = $mol_regexp.from( /^/ )
		static end = $mol_regexp.from( /$/ )
		static or = $mol_regexp.from( /|/ )
		
	}
	
}
