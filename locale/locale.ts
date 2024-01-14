namespace $ {
	
	export interface $mol_locale_dict {
		[ key : string ] : string
	}
	
	/**
	 * Localisation in $mol framework
	 * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
	 */
	export class $mol_locale extends $mol_object {
		
		@ $mol_mem
		static lang_default() {
			return 'en'
		}
		
		@ $mol_mem
		static lang( next? : string ) {
			return this.$.$mol_state_local.value( 'locale' , next ) || $mol_dom_context.navigator.language.replace( /-.*/ , '' ) || this.lang_default()
		}
		
		@ $mol_mem_key
		static source( lang : string ) {
			return JSON.parse( this.$.$mol_file.relative( `web.locale=${ lang }.json` ).text().toString() )
		}
		
		@ $mol_mem_key
		static texts( lang : string , next? : $mol_locale_dict ) : $mol_locale_dict {
			if( next ) return next
			
			try {
				return this.source( lang ).valueOf()
			} catch( error: any ) {
				if( $mol_fail_catch( error ) ) {
					const def = this.lang_default()
					if( lang === def ) throw error
				}
			}
			
			return {}
		}
		
		@ $mol_mem_key
		static text( key : string ): string {
			
			const lang = this.lang()

			const target = this.texts( lang )[ key ]
			if( target ) return target
			
			this.warn( key )
			
			const en = this.texts( 'en' )[ key ]
			if( !en ) return key
			
			// try {
			// 	return $mol_wire_sync( $hyoo_lingua_translate ).call( this.$, lang, en )
			// } catch( error ) {
			// 	$mol_fail_log( error )
			// }
			
			return en
		}
		
		@ $mol_mem_key
		static warn( key : string ) {
			console.warn( `Not translated to "${ this.lang() }": ${ key }` )
			return null
		}
		
	}
	
}
