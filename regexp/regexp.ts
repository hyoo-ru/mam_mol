interface String {
	
	match< RE extends RegExp >( regexp: RE ): ReturnType<
		RE[ typeof Symbol.match ]
	>
	
    matchAll< RE extends RegExp >( regexp: RE ): ReturnType<
		RE[ typeof Symbol.matchAll ]
	>
	
}

namespace $ {
	
	type Groups_to_params<T> = {
		[P in keyof T]?: T[P] | boolean | undefined;
	};	

	export type $mol_regexp_source =
	| number
	| string
	| RegExp
	| { [ key in string ] : $mol_regexp_source }
	| readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

	export type $mol_regexp_groups< Source extends $mol_regexp_source >
	
		= Source extends number
		? {}
		
		: Source extends string
		? {}
		
		: Source extends $mol_regexp_source[]
		? $mol_type_merge< $mol_type_intersect< {
			[ key in Extract< keyof Source , number > ] : $mol_regexp_groups< Source[ key ] >
		}[ Extract< keyof Source , number > ] > >
		
		: Source extends RegExp
		? Record< string, string > extends NonNullable< NonNullable< ReturnType< Source['exec'] > >[ 'groups' ] >
			? {}
			: NonNullable< NonNullable< ReturnType< Source['exec'] > >[ 'groups' ] >
		
		: Source extends { readonly [ key in string ] : $mol_regexp_source }
		? $mol_type_merge< $mol_type_intersect< {
			[ key in keyof Source ] :
				$mol_type_merge<
					& $mol_type_override<
						{
							readonly [ k in Extract< keyof Source , string > ]: string
						},
						{
							readonly [ k in key ]:
								Source[ key ] extends string
									? Source[ key ]
									: string
						}
					>
					& $mol_regexp_groups< Source[ key ] >
				>
		}[ keyof Source ] > >

		: never
		
	/** Type safe reguar expression builder */
	export class $mol_regexp< Groups extends Record< string , string > > extends RegExp {
		
		/** Prefer to use $mol_regexp.from */
		constructor( source : string , flags : string = 'gsu' , readonly groups : ( Extract< keyof Groups , string > )[] = [] ) {
			super( source , flags )
		}
		
		*[Symbol.matchAll] (str:string): RegExpStringIterator< RegExpMatchArray & $mol_type_override< RegExpMatchArray, { groups?: { [ key in keyof Groups ] : string } } > > {
			const index = this.lastIndex
			this.lastIndex = 0
			try {
				while ( this.lastIndex < str.length ) {
					const found = this.exec(str)
					if( !found ) break
					yield found
				}
			} finally {
				this.lastIndex = index
			}
		}
		
		/** Parses input and returns found capture groups or null */
		[ Symbol.match ]( str : string ): null | RegExpMatchArray {
			const res = [ ... this[Symbol.matchAll]( str ) ].filter( r => r.groups ).map( r => r[0] )
			if( !res.length ) return null
			return res as RegExpMatchArray
		}
		
		/** Splits string by regexp edges */
		[ Symbol.split ]( str : string ): string[] {
			
			const res = [] as string[]
			let token_last = null
			
			for( let token of this[Symbol.matchAll]( str ) ) {
				if( token.groups && ( token_last ? token_last.groups : true ) ) res.push( '' )
				res.push( token[0] )
				token_last = token
			}
			
			if( !res.length ) res.push( '' )
			
			return res
		}
		
		test( str : string ): boolean {
			return Boolean( str.match( this) )
		}
		
		exec( str : string ): RegExpExecArray & $mol_type_override< RegExpExecArray , { groups?: { [ key in keyof Groups ] : string } } > | null {
			
			const from = this.lastIndex
			if( from >= str.length ) return null
			
			const res = super.exec( str )
			if( res === null ) {
				this.lastIndex = str.length
				if( !str ) return null
				return Object.assign( [ str.slice( from ) ], {
					index: from,
					input: str,
				} ) as any
			}

			if( from === this.lastIndex ) {
				$mol_fail( new Error( 'Captured empty substring' ) )
			}

			type Token = { [ key in keyof Groups ] : string } & { [ key : number ] : string }
			const groups = {} as Token
			
			const skipped = str.slice( from , this.lastIndex - res[0].length )
			if( skipped ) {
				this.lastIndex = this.lastIndex - res[0].length
				return Object.assign( [ skipped ], {
					index: from,
					input: res.input,
				} ) as any
			}
			
			for( let i = 0 ; i < this.groups.length ; ++i ) {
				const group = this.groups[ i ]
				groups[ group ] = groups[ group ] || res[ i + 1 ] || '' as any
			}

			return Object.assign( res, { groups } )
		}
		
		generate(
			params: Groups_to_params< Groups >
		): string | null {
			return null
		}
		
		get native() {
			return new RegExp( this.source, this.flags )
		}
		
		/** Makes regexp that greedy repeats this pattern with delimiter */
		static separated<
			Chunk extends $mol_regexp_source,
			Sep extends $mol_regexp_source,
		>(
			chunk: Chunk,
			sep: Sep,
		) {
			return $mol_regexp.from([
				$mol_regexp.repeat_greedy([ [chunk], sep ], 0),
				chunk,
			])
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
			
			const str = `(?:${ regexp.source }){${ min },${ upper }}?`
			const regexp2 =  new $mol_regexp( str , regexp.flags , regexp.groups )
			
			regexp2.generate = params => {
				const res = regexp.generate( params )
				if( res ) return res
				if( min > 0 ) return res
				return ''
			}
	
			return regexp2
	
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
			
			const str = `(?:${ regexp.source }){${ min },${ upper }}`
			const regexp2 =  new $mol_regexp( str , regexp.flags , regexp.groups )
			
			regexp2.generate = params => {
				const res = regexp.generate( params )
				if( res ) return res
				if( min > 0 ) return res
				return ''
			}
	
			return regexp2
		}

		/** Makes regexp that match any of options */
		static vary<
			Sources extends readonly $mol_regexp_source[]
		>(
			sources : Sources ,
			flags : string = 'gsu',
		) {
			
			const groups = [] as string[]
			
			const chunks = sources.map( source => {

				const regexp = $mol_regexp.from( source )
				groups.push( ... regexp.groups )
				
				return regexp.source

			} ) as any as readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]
			
			return new $mol_regexp< $mol_regexp_groups< Sources[number] > >(
				`(?:${ chunks.join('|') })` ,
				flags ,
				groups as any[] ,
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

			let flags = 'gsu'
			if( multiline ) flags += 'm'
			if( ignoreCase ) flags += 'i'

			if( typeof source === 'number' ) {

				const src = `\\u{${ source.toString(16) }}`
				const regexp = new $mol_regexp< $mol_regexp_groups< Source > >( src , flags )
				regexp.generate = ()=> src
				return regexp

			} if( typeof source === 'string' ) {

				const src = source.replace( /[.*+?^${}()|[\]\\]/g , '\\$&' ) 
				const regexp = new $mol_regexp< $mol_regexp_groups< Source > >( src , flags )
				regexp.generate = ()=> source
				return regexp

			} else if( source instanceof $mol_regexp ) {
				
				const regexp =  new $mol_regexp<any>( source.source, flags, source.groups )
				regexp.generate = params => source.generate( params )
				return regexp
				
			} if( source instanceof RegExp ) {


				const test = new RegExp( '|' + source.source )
				const groups = Array.from(
					{ length : test.exec('')!.length - 1 } ,
					( _ , i )=> String( i + 1 ) ,
				)

				const regexp = new $mol_regexp< $mol_regexp_groups< Source > >(
					source.source ,
					source.flags ,
					groups as any ,
				)
				
				regexp.generate = ()=> ''

				return regexp

			} if( Array.isArray( source ) ) {

				const patterns = source.map( src => Array.isArray( src )
					? $mol_regexp.optional( src as any )
					: $mol_regexp.from( src )
				)
				
				const chunks = patterns.map( pattern => pattern.source )
				
				const groups = [] as ( Extract< keyof $mol_regexp_groups< Source > , string > )[]

				let index = 0
		
				for( const pattern of patterns ) {
					
					for( let group of pattern.groups ) {
						if( Number( group ) >= 0 ) {
							groups.push( String( index ++ ) as any )
						} else {
							groups.push( group )
						}
					}
		
				}
				
				const regexp = new $mol_regexp( chunks.join( '' ) , flags , groups )
				
				regexp.generate = params => {
					let res = ''
					for( const pattern of patterns ) {
						let sub = pattern.generate( params )
						if( sub === null ) return ''
						res += sub
					}
					return res
				}
				
				return regexp
		
			} else {

				const groups = [] as string[]

				const chunks = Object.keys( source ).map( name => {

					groups.push( name )

					const regexp = $mol_regexp.from( (source as any)[ name ] )
					groups.push( ... regexp.groups )
					
					return `(${regexp.source})`

				} ) as any as readonly[ $mol_regexp_source , ... $mol_regexp_source[] ]

				const regexp = new $mol_regexp< $mol_regexp_groups< Source > >(
					`(?:${ chunks.join('|') })` ,
					flags ,
					groups as any[] ,
				)
				
				const validator = new RegExp( '^' + regexp.source + '$', flags )
				regexp.generate = (params: any) => {
					
					for( let option in source ) {
						
						if( option in params ) {
							
							if( typeof params[ option ] === 'boolean' ) {
								
								if( !params[ option as any ] ) continue
								
							} else {
								
								const str = String( params[ option ] )
								if( str.match( validator ) ) return str
								
								$mol_fail( new Error( `Wrong param: ${option}=${str}` ) )
							}
							
						} else {
							if( typeof (source as any)[ option ] !== 'object' ) continue
						}
						
						const res = $mol_regexp.from( (source as any)[ option  ] ).generate( params )
						if( res ) return res
						
					}
					
					return null
				}
				
				return regexp

			}
	
		}

		/** Makes regexp which includes only unicode category */
		static unicode_only( ... category: $mol_unicode_category ) {
			return new $mol_regexp(
				`\\p{${ category.join( '=' ) }}`
			)
		}

		/** Makes regexp which excludes unicode category */
		static unicode_except( ... category: $mol_unicode_category ) {
			return new $mol_regexp(
				`\\P{${ category.join( '=' ) }}`
			)
		}

		static char_range(
			from: number,
			to: number,
		): $mol_regexp<{}> {
			return new $mol_regexp(
				`${ $mol_regexp.from( from ).source }-${ $mol_regexp.from( to ).source }`
			)
		}

		static char_only(
			... allowed: readonly [ $mol_regexp_source, ... $mol_regexp_source[] ]
		): $mol_regexp<{}> {
			const regexp = allowed.map( f => $mol_regexp.from( f ).source ).join('')
			return new $mol_regexp( `[${ regexp }]` )
		}

		static char_except(
			... forbidden: readonly [ $mol_regexp_source, ... $mol_regexp_source[] ]
		): $mol_regexp<{}> {
			const regexp = forbidden.map( f => $mol_regexp.from( f ).source ).join('')
			return new $mol_regexp( `[^${ regexp }]` )
		}
		
		static decimal_only = $mol_regexp.from( /\d/gsu )
		static decimal_except = $mol_regexp.from( /\D/gsu )
		
		static latin_only = $mol_regexp.from( /\w/gsu )
		static latin_except = $mol_regexp.from( /\W/gsu )
		
		static space_only = $mol_regexp.from( /\s/gsu )
		static space_except = $mol_regexp.from( /\S/gsu )
		
		static word_break_only = $mol_regexp.from( /\b/gsu )
		static word_break_except = $mol_regexp.from( /\B/gsu )
		
		static tab = $mol_regexp.from( /\t/gsu )
		static slash_back = $mol_regexp.from( /\\/gsu )
		static nul = $mol_regexp.from( /\0/gsu )
		
		static char_any = $mol_regexp.from( /./gsu )
		static begin = $mol_regexp.from( /^/gsu )
		static end = $mol_regexp.from( /$/gsu )
		static or = $mol_regexp.from( /|/gsu )
		
		static line_end = $mol_regexp.from({
			win_end: [ [ '\r' ], '\n' ],
			mac_end: '\r',
		})
		
	}
	
}
