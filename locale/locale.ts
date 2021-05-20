namespace $ {

	export interface $mol_locale_dict {
		[ key : string ] : string
	}

	export type $mol_locale_plural_rule = ( n: number ) => number

	export interface $mol_locale_plural_dict {
		[ locale: string ]: $mol_locale_plural_rule
	}

	export interface $mol_locale_plural_type_to_language {
		[ locale: string ]: string[]
	}

	export interface $mol_locale_tranform_param	 {
		key: string,
		/// Options for interpolating in %{...} pattern
		params?: any,
		/// Count value for pluralization. Override other interpolated option in "%{...}"
		count?: number
	}

	export class $mol_locale extends $mol_object {

		static interpolateRegExp = /%\{\s*(.*?)\s*\}/g // %{ }
		static plural_delimiter = /\|\|\|\|\n?/g;
		static plural_count_indicator = /\s*is\s+plural/;

		static russian_plural_groups = ( n: number ) => {
			var lastTwo = n % 100;
			var end = lastTwo % 10;
			if( lastTwo !== 11 && end === 1 ) {
				return 0;
			}
			if( 2 <= end && end <= 4 && !( lastTwo >= 12 && lastTwo <= 14 ) ) {
				return 1;
			}
			return 2;
		}

		// See for actual rules: https://github.com/airbnb/polyglot.js/blob/master/index.js#L48
		static plural_rules: $mol_locale_plural_dict = {
			arabic: function( n: number ) {
				// http://www.arabeyes.org/Plural_Forms
				if( n < 3 ) { return n; }
				var lastTwo = n % 100;
				if( lastTwo >= 3 && lastTwo <= 10 ) return 3;
				return lastTwo >= 11 ? 4 : 5;
			},
			bosnian_serbian: $mol_locale.russian_plural_groups,
			chinese: function(n) { return 0; },
			croatian: $mol_locale.russian_plural_groups,
			french: function( n: number ) { return n >= 2 ? 1 : 0; },
			german: function( n: number ) { return n !== 1 ? 1 : 0; },
			russian: $mol_locale.russian_plural_groups,
			lithuanian: function( n: number ) {
				if( n % 10 === 1 && n % 100 !== 11 ) { return 0; }
				return n % 10 >= 2 && n % 10 <= 9 && ( n % 100 < 11 || n % 100 > 19 ) ? 1 : 2;
			},
			czech: function( n: number ) {
				if( n === 1 ) { return 0; }
				return ( n >= 2 && n <= 4 ) ? 1 : 2;
			},
			polish: function( n: number ) {
				if( n === 1 ) { return 0; }
				var end = n % 10;
				return 2 <= end && end <= 4 && ( n % 100 < 10 || n % 100 >= 20 ) ? 1 : 2;
			},
			icelandic: function( n: number ) { return ( n % 10 !== 1 || n % 100 === 11 ) ? 1 : 0; },
			slovenian: function( n: number ) {
				var lastTwo = n % 100;
				if( lastTwo === 1 ) {
					return 0;
				}
				if( lastTwo === 2 ) {
					return 1;
				}
				if( lastTwo === 3 || lastTwo === 4 ) {
					return 2;
				}
				return 3;
			}
		}

		static plural_type_to_languages: $mol_locale_plural_type_to_language = {
			arabic: [ 'ar' ],
			bosnian_serbian: [ 'bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS' ],
			chinese: [ 'id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh' ],
			croatian: [ 'hr', 'hr-HR' ],
			german: [ 'fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr' ],
			french: [ 'fr', 'tl', 'pt-br' ],
			russian: [ 'ru', 'ru-RU' ],
			lithuanian: [ 'lt' ],
			czech: [ 'cs', 'cs-CZ', 'sk' ],
			polish: [ 'pl' ],
			icelandic: [ 'is' ],
			slovenian: [ 'sl-SL' ]
		};

		@ $mol_mem
		static lang_default() {
			return 'en'
		}
		
		@ $mol_mem
		static lang( next? : string ) {
			return $mol_state_local.value( 'locale' , next ) || $mol_dom_context.navigator.language.replace( /-.*/ , '' ) || this.lang_default()
		}
		
		@ $mol_mem_key
		static source( lang : string ) {
			return JSON.parse( $mol_file.relative( `web.locale=${ lang }.json` ).text().toString() )
		}
		
		@ $mol_mem_key
		static texts( lang : string , next? : $mol_locale_dict ) : $mol_locale_dict {
			if( next ) return next
			
			try {
				return this.source( lang ).valueOf()
			} catch( error ) {
				if( 'then' in error ) $mol_fail_hidden( error )
				const def = this.lang_default()
				if( lang === def ) throw error
				return this.source( def )
			}
		}

		static get_plural_rule( lang: string ) {
			const rules = this.plural_type_to_languages
			for( const rule in rules ) {
				if( rules[ rule ].includes( lang ) )
					return this.plural_rules[ rule ] || null
			}
		}

		/**
		 * Translate, interpolate and pluralizate
		 */
		@ $mol_mem_key
		static t( { key, params, count }: $mol_locale_tranform_param) {
			let {lang, text} = this._text( key )

			let plural_count_var_value
			let first_var_value: any
			if( params ) {
				// Interpolate text
				text = text.replace( this.interpolateRegExp, ( expression, argument ) => {
					let use_this_var_as_plural = false
					let method = argument.replace( this.plural_count_indicator, '' )
					if ( method != argument ) use_this_var_as_plural = true
					method = params[ method ]
					const type = typeof method
					let value;
					if( type === 'function' ) {
						value = method.call(params)
					} else if (type == 'string' || type == 'number' || type == 'boolean') {
						value = method
					} else {
						value = expression
					}
					if( Array.isArray( value )) value = value.length
					if( use_this_var_as_plural ) plural_count_var_value = value
					if (first_var_value === undefined) first_var_value = value
					return '' + value
				} )
			}

			// Pluralization ||||
			const texts = text.split( this.plural_delimiter );
			if( texts.length == 1 ) return texts[ 0 ]

			const plural_count_value = count !== undefined
				? count
				: plural_count_var_value !== undefined
					? plural_count_var_value
					: first_var_value
			const plural_rule = this.get_plural_rule(lang)
			if( !plural_rule ) {
				this.warn_log( `Plural rule not found for language: "${ lang }"` )
				return `<${ key }>`
			}
			const plural_count = plural_rule( plural_count_value || 0 )
			let result_text = texts[ plural_count ]
			if( result_text === undefined ) {
				const warn = `Plural form #${ plural_count } not found for "${ lang }": ${ key }`
				this.warn_log( warn )
				return `<${ warn }>`
			}
			return result_text

			return text;
		}

		@$mol_mem_key
		static _text( key: string ) {
			for( let lang of [ this.lang(), 'en' ] ) {
				const text = this.texts( lang )[ key ]
				if( text ) return { text, lang }

				this.warn( key )
			}
			return { text: `<${ key }>`, lang: this.lang() }
		}

		static text( key : string ) {
			return this._text(key).text
		}
		
		@ $mol_mem_key
		static warn( key : string ) {
			console.warn( `Not translated to "${ this.lang() }": ${ key }` )
			return null
		}

		@$mol_mem_key
		static warn_log ( msg: string ) {
			console.warn( msg )
			return null
		}
	}
}
